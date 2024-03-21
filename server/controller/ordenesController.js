const sequelize=require("../database/db")

const Orden=require("../models/Ficha_Tecnica/FichaTecnica")
const Insumo=require("../models/Insumo")
const DetalleOrden=require("../models/Ficha_Tecnica/DetalleFichaTecnica")
const Cliente = require("../models/Cliente");
const Presentacion = require("../models/Presentacion/Presentacion")
const fs = require('fs')
const { request } = require("express");

async function listarFichasTecnicasPortodo(req, res){
  try {
      const ordenes = await Orden.findAll();

      res.json(ordenes);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener órdenes' });
  }
}

async function listarFichasTecnicas(req, res){
  try {
      const ordenes = await Orden.findAll({
          where: {
              operacion: 'Pendiente'
          },  include: [
     
            {
              model: Cliente,
              attributes:["nombre"]
            }
          ],
      });

      res.json(ordenes);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener órdenes' });
  }
}

async function listarFichasTecnicasRealizada(req, res){
  try {
      const ordenes = await Orden.findAll({
          where: {
              operacion: 'Realizada'
          },  include: [
     
            {
              model: Cliente,
              attributes:["nombre"]
            }
          ],
      });

      res.json(ordenes);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener órdenes' });
  }
}

async function listarFichaTecnica(req, res) {
  const { id_ft } = req.params;

  try {
    const ficha = await Orden.findOne({
      where: { id_ft: id_ft },
      include: [
     
        {
          model: Cliente,
          attributes:["nombre"]
        }
      ],
    });

    if (!ficha) {
      return res.status(404).json({ error: "ficha no encontrada" });
    }



    const detalleFicha = await DetalleOrden.findAll({
      where: { fk_ficha_tecnica: ficha.id_ft },
      attributes: [
        "id_detalle_ft",
        "fk_insumo",
        "cantidad",
        "precio",
      ],
      include: [
        {
          model: Insumo,
          attributes: ["id_insumo","nombre"],
          include: [
            {
              model: Presentacion,
              attributes: ["nombre_presentacion"] // Puedes agregar aquí los atributos que desees de la presentación
            }
          ]
        }
      ],
    });

    const fichaConDetalles = {
      ...ficha.toJSON(),
      detalles: detalleFicha,
    };

    res.json(fichaConDetalles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la ficha" });
  }
}

async function crearFichaTecnica(req, res) {
    try {
      const dataFicha = req.body;

    //   if(!req.file) {
    //     return res.json({ message: "Error la imagen del producto es requerida" });
    // }
    const existeNombre = await Orden.findOne({
      where: {
        nombre_ficha: dataFicha.nombre_ficha,
      },
    });

    if (existeNombre) {
      return res.status(400).json({ error: "El nombre de la orden ya está registrado" });
    }
      await sequelize.transaction(async (t) => {
        const insumos = dataFicha.insumo || [];
  
        let fichaValida = true;
  
        for (const insumo of insumos) {
          const insumoActual = await Insumo.findByPk(insumo.fk_insumo);
  
          if (!insumoActual || insumoActual.cantidad < insumo.cantidad || insumoActual.cantidad === 0) {
            fichaValida = false;
            break;
          }
        }
  
        if (fichaValida) {
          const createdFicha = await Orden.create(
            {
              nombre_ficha:dataFicha.nombre_ficha,
              fk_cliente: dataFicha.id_cliente.fk_cliente,

              imagen_producto_final:req.file ? req.file.filename : "",
              costo_final_producto:dataFicha.costo_final_producto,
              detalle: dataFicha.detalle,
              mano_obra:dataFicha.mano_obra,
              operacion:"Pendiente",
              fecha: dataFicha.fecha,
              estado: 1,
              
              // nombre_ficha:dataFicha.nombre_ficha,
              // imagen_producto_final:dataFicha.imagen_producto_final,
              // costo_final_producto: dataFicha.costo_final_producto,
              // detalle: dataFicha.detalle,
              // estado: 1,
            },
            { transaction: t }
          );
  
          for (const insumo of insumos) {

            await DetalleOrden.create(
              {
                
                fk_insumo: insumo.fk_insumo,
                fk_ficha_tecnica: createdFicha.id_ft,
                cantidad: insumo.cantidad,
                precio: insumo.precio,
               
              },
              { transaction: t }
            );
  
            // await Insumo.update(
            //   {
            //     cantidad: sequelize.literal(
            //       `cantidad - ${insumo.cantidad}`
            //     ),
            //   },
            //   { where: { id_insumo: insumo.fk_insumo }, transaction: t }
            // );
          }
  
          res.status(201).json(createdFicha);
        } else {
          res.status(400).json({
            error: "No hay suficiente cantidad en stock para realizar la ficha",
          });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al realizar la compra" });
    }
  }


  async function actualizarFichaTecnica(req, res) {
    const id = req.params.id;
    const { nombre_ficha, fk_cliente, costo_final_producto, detalle, mano_obra, detalles } = req.body; // Asumiendo que `detalles` es un array de detalles de la ficha técnica
  
    try {
      const fichaTecnicaExistente = await Orden.findByPk(id);
      if (!fichaTecnicaExistente) {
        return res.status(404).json({ error: 'Ficha Técnica no encontrada' });
      }
      
      // Objeto para actualizar la ficha técnica principal
      let actualizarObjeto = {
        nombre_ficha,
        fk_cliente,
        costo_final_producto,
        mano_obra,
        detalle
      };
  
      // Si hay un archivo nuevo, actualiza el campo de imagen
      if (req.file && req.file.filename) {
        actualizarObjeto.imagen_producto_final = req.file.filename;
      }
      await fichaTecnicaExistente.update(actualizarObjeto);
   // Actualizar los detalles de la ficha técnica
      // Esto es un esquema básico, necesitarás ajustarlo a tu lógica de negocio específica
      if (detalles && detalles.length > 0) {
        // Eliminar detalles existentes, una opción es eliminarlos todos y volver a insertar
        // Otra opción es actualizar los existentes y añadir los nuevos
        await DetalleOrden.destroy({
          where: { fk_ficha_tecnica: id }
        });
  
        // Insertar los nuevos detalles
        for (const detalle of detalles) {
          await DetalleOrden.create({
            fk_ficha_tecnica: id,
            fk_insumo: detalle.fk_insumo,
            cantidad: detalle.cantidad,
            precio: detalle.precio,
            // Agrega los campos necesarios según tu modelo
          });
        }
      }
      res.status(200).json({ message: 'Ficha Técnica actualizada con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar la Ficha Técnica' });
    }
  }
  

async function eliminarFichaTecnica(req, res) {
    try {
        const id = req.params.id;
        const responses = await DetalleOrden.destroy({ where: { fk_ficha_tecnica: id } });

        // const fichas_tecnicas = await FichaTecnica.findByPk(id);
        const response = await Orden.destroy({ where: { id_ft: id } });


        // if (!fichas_tecnicas) {
        //     return res.status(404).json({ error: 'Cliente no encontrado' });
        // }

        // // Elimina el cliente
        // await fichas_tecnicas.destroy();
        if (response === 1 || responses ===1) {
          // Si se eliminó correctamente, response será 1.
          res.status(200).json({ message: 'Ficha eliminado con éxito' });
        } else {
          // Si no se encontró el usuario o no se pudo eliminar, response será 0.
          res.status(404).json({ message: 'Ficha no encontrado o no se pudo eliminar' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar cliente' });
    }
}

async function desactivarFichaTecnica(req, res) {
    try {
      const id_ft = req.params.id_ft;
      const cliente = await Orden.findByPk(id_ft);
        
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
  
        // Actualiza el estado del cliente a "deshabilitado" (false)
        await cliente.update({ estado: false });
  
        res.status(200).json({ message: 'Cliente deshabilitado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al deshabilitar cliente' });
    }
  }
  
  async function activarFichaTecnica(req, res) {
    try {
        const id_ft = req.params.id_ft;
        const cliente = await Orden.findByPk(id_ft);
        
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
  
        await cliente.update({ estado: true });
  
        res.status(200).json({ message: 'Cliente habilitado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al habilitar cliente' });
    }
  }


  async function operacionOrden(req, res) {
    try {
        const id_ft = req.params.id_ft;
        const nuevaOperacion = req.body.operacion; // Suponiendo que envías la nueva operación desde el cliente

        const fichaTecnica = await Orden.findByPk(id_ft);
        
      
        // Obtener detalles de orden para el producto actual
        const detallesOrden = await DetalleOrden.findAll({ where: { fk_ficha_tecnica: fichaTecnica.id_ft } });

        
            // Verificar si todos los insumos tienen suficiente cantidad
            for (const detalle of detallesOrden) {
                const insumo = await Insumo.findByPk(detalle.fk_insumo);

                if (insumo) {
                    // Si la cantidad del detalle de orden es mayor a la cantidad disponible del insumo, devuelve un error
                    if (detalle.cantidad > insumo.cantidad) {
                      const error = `Cantidad insuficiente del insumo:${insumo.nombre} : ${detalle.cantidad}, solo tienes en Stock ${insumo.cantidad}`;
                     
                       return res.status(500).json({ error:error });
  
                    }
                }
            }
        

        // Si todos los insumos tienen suficiente cantidad, procede con la actualización de la operación
        await fichaTecnica.update({ operacion: nuevaOperacion });
        
        // Actualizar detalles de insumos si la nueva operación es "Realizada"
        if (nuevaOperacion === "Realizada") {
            for (const detalle of detallesOrden) {
                const insumo = await Insumo.findByPk(detalle.fk_insumo);

                if (insumo) {
                    const nuevaCantidad = insumo.cantidad - detalle.cantidad;
                    await Insumo.update(
                        { cantidad: nuevaCantidad },
                        { where: { id_insumo: insumo.id_insumo } }
                    );
                }
            }
        }

        res.status(200).json({ message: 'Operación actualizada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar operación' });
    }
}




const { Op , fn, col} = require("sequelize");


async function listarVentasPorFechas(req, res) {
  try {
    // Agregar condición de búsqueda para obtener solo las órdenes con operación "Realizada"
    const totalVentas = await Orden.sum('costo_final_producto', {
      where: {
        operacion: 'Realizada'
      }
    });
    
    res.json(totalVentas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el total de la orden" });
  }
}


async function listarVentasPorFechasDia(req, res) {
  try {
    // Obtén la fecha actual en la zona horaria GMT-5 (Colombia)
    const fechaActualColombia = new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' });
    const fechaActual = new Date(fechaActualColombia);

    // Ajusta la fecha para obtener el primer día de la semana (domingo) y establece la hora al comienzo del día
    const inicioSemana = new Date(fechaActual);
    inicioSemana.setDate(fechaActual.getDate() - fechaActual.getDay());
    inicioSemana.setHours(0, 0, 0, 0);

    // Ajusta la fecha para obtener el último día de la semana (sábado) y establece la hora al final del día
    const finSemana = new Date(inicioSemana);
    finSemana.setDate(inicioSemana.getDate() + 6);
    finSemana.setHours(23, 59, 59, 999);

    // Consulta las ventas dentro del rango de la semana
    const totalVentasSemana = await Orden.sum('costo_final_producto', {
      where: {
        operacion: 'Realizada',
        fecha: {
          [Op.between]: [inicioSemana, finSemana],
        },
      },
    });

    res.json(totalVentasSemana);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el total de ventas de la semana" });
  } 
}

async function listarComprasPorFechasDia(req, res) {
  try {
      // Consulta todas las compras agrupadas por mes
      const ventasPorMes = await Orden.findAll({
        where:{
          operacion: 'Realizada'
        },
          attributes: [
              [fn('MONTH', col('fecha')), 'mes'],
              [fn('SUM', col('costo_final_producto')), 'totalVentasMes']
          ],
          group: [fn('MONTH', col('fecha'))],
      });

      // Mapea los resultados para agregar los nombres de los meses y completar los faltantes
      const ventasPorMesConNombre = agregarMesesFaltantes(ventasPorMes);

      res.json(ventasPorMesConNombre);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los totales de ventas por mes" });
  }
}

// Función para obtener el nombre del mes dado su número
function obtenerNombreMes(numeroMes) {
  const meses = [
      "Ene", "Feb", "Mar", "Abr", "May", "Jun",
      "Jul", "Agos", "Sept", "Octu", "Novi", "Dici"
  ];
  return meses[numeroMes - 1];
}

// Función para agregar meses faltantes
function agregarMesesFaltantes(ventasPorMes) {
  const mesesFaltantes = [];
  for (let i = 1; i <= 12; i++) {
      const ventaEnMes = ventasPorMes.find(venta => venta.getDataValue('mes') === i);
      if (ventaEnMes) {
          mesesFaltantes.push({ mes: obtenerNombreMes(i), totalVentasMes: ventaEnMes.getDataValue('totalVentasMes') });
      } else {
          mesesFaltantes.push({ mes: obtenerNombreMes(i), totalVentasMes: 0 });
      }
  }
  return mesesFaltantes;
}
  

async function listarComprasPorFechasDias(req, res) {
  try {
    // Obtén la fecha de inicio de la semana actual (domingo)
    const fechaActual = new Date();
    const primerDiaSemana = new Date(fechaActual);
    primerDiaSemana.setDate(primerDiaSemana.getDate() - fechaActual.getDay()); // Resta los días de la semana actual

    // Obtén la fecha de fin de la semana actual (sábado)
    const ultimoDiaSemana = new Date(fechaActual);
    ultimoDiaSemana.setDate(ultimoDiaSemana.getDate() + (6 - fechaActual.getDay())); // Agrega los días restantes hasta sábado

    // Consulta las compras dentro del rango de la semana actual
    const ventasPorDiaSemana = await Orden.findAll({
      attributes: [
        [fn('DAYOFWEEK', col('fecha')), 'diaSemana'],
        [fn('SUM', col('costo_final_producto')), 'totalVentasDia']
      ],
      where: {
        operacion: 'Realizada',
        fecha: {
          [Op.between]: [primerDiaSemana, ultimoDiaSemana],
        },
      },
      group: [fn('DAYOFWEEK', col('fecha'))],
    });

    // Mapea los resultados para agregar los nombres de los días de la semana y completar los faltantes
    const ventasPorDiaSemanaConNombre = agregarDiasFaltantess(ventasPorDiaSemana);

    res.json(ventasPorDiaSemanaConNombre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los totales de ventas por día de la semana" });
  }
}


// Función para obtener el nombre del día de la semana dado su número
function obtenerNombreDiaSemanas(numeroDia) {
  const diasSemana = [
      "Domin", "Lun", "Mart", "Miérc", "Juev", "Vier", "Sáb"
  ];
  return diasSemana[numeroDia - 1];
}

// Función para agregar días de la semana faltantes
function agregarDiasFaltantess(ventasPorDiaSemana) {
  const diasFaltantes = [];
  for (let i = 1; i <= 7; i++) {
      const ventaEnDia = ventasPorDiaSemana.find(venta => venta.getDataValue('diaSemana') === i);
      if (ventaEnDia) {
          diasFaltantes.push({ diaSemana: obtenerNombreDiaSemanas(i), totalVentasDia: ventaEnDia.getDataValue('totalVentasDia') });
      } else {
          diasFaltantes.push({ diaSemana: obtenerNombreDiaSemanas(i), totalVentasDia: 0 });
      }
  }
  return diasFaltantes;
}




module.exports ={
    listarFichasTecnicas,
    listarFichaTecnica,
    crearFichaTecnica,
    actualizarFichaTecnica,
    eliminarFichaTecnica,
    activarFichaTecnica,
    desactivarFichaTecnica,
    operacionOrden,
    listarFichasTecnicasRealizada,
    listarVentasPorFechas,
    listarVentasPorFechasDia,
  listarComprasPorFechasDia,
  listarComprasPorFechasDias,
  listarFichasTecnicasPortodo
}