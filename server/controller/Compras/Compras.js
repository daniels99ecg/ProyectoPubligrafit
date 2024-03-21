const Compras=require("../../models/Compras/Compras")
const sequelize=require("../../database/db")
const Compras_detalle=require('../../models/Detalle_Compra/Detalle_Compra')
const Insumo = require("../../models/Insumo");
const Proveedor = require("../../models/Proovedor/Proovedor");
const Presentacion = require("../../models/Presentacion/Presentacion")


async function listarCompras(req, res) {
  try {
        const compras=await Compras.findAll({
          attributes: [
            "id_compra",
            "fk_proveedor",
            "cantidad",
            "fecha",
            "total",
          ],
          include: [
            {
              model: Proveedor,
              attributes: ["nombre"],
            }
          ],
        })

    const comprasConDetalles = await Promise.all(
      compras.map(async (compra) => {
        const detalleCompra = await Compras_detalle.findAll({
          where: { fk_compra: compra.id_compra },
          attributes: [
            "id_detalle_compra",
            "fk_insumo",
            "cantidad",
            "precio",
            "subtotal",
          ],
          include: [
            {
              model: Insumo,
              attributes: ["nombre"],
              
            },
          ],
        });

        return {
          ...compra.toJSON(),
          detalles: detalleCompra,
        };
      })
    );

    res.json(comprasConDetalles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las ventas" });
  }
}


async function listarcompra(req, res) {
  const { id_compra } = req.params;

  try {
    const compra = await Compras.findOne({

      where: {
        id_compra: id_compra,
    },
    include:[
      
        {
          model:Proveedor,
          attributes:["nombre"],
        }
    ]
    });

    if (!compra) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }

    const detalleCompra = await Compras_detalle.findAll({
      where: { fk_compra: compra.id_compra },
      attributes: [
        "id_detalle_compra",
        "fk_insumo",
        "cantidad",
        "precio",
        "subtotal",
      ],
      include: [
        {
          model: Insumo,
          attributes: ["nombre"],  
          include: [
            {
              model: Presentacion,
              attributes: ["nombre_presentacion"] // Puedes agregar aquí los atributos que desees de la presentación
            }
          ]
        }
      
      ],
    });

    const compraConDetalles = {
      ...compra.toJSON(),
      detalles: detalleCompra,
    };

    res.json(compraConDetalles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la venta" });
  }
}


async function crearCompras(req, res) {
  try {
    const datacompra = req.body;
    // let proveedorId;

    // // Verificar si el proveedor ya existe o crear uno nuevo
    // if (datacompra.id_proveedores && datacompra.id_proveedores.fk_proveedor) {
    //   proveedorId = datacompra.id_proveedores.fk_proveedor;
    // } else {
    //   // Crear un nuevo proveedor
    //   const nuevoProveedor = await Proveedor.create({
    //     // Asegúrate de que estos campos coincidan con tu modelo Proveedor
    //     nombre: datacompra.nombre_proveedor,
    //     telefono:0,
    //     estado:1
    //     // Otros campos del proveedor según tu modelo
    //   });
    //   proveedorId = nuevoProveedor.id_proveedores;
    // }


 // Verificar si la categoría ya existe o crearla
 let proveedorId = await Proveedor.findOne({
  where: { nombre: datacompra.nombreProvedor }
});

if (!proveedorId) {
  // Si la categoría no existe, la crea
  proveedorId = await Proveedor.create(
    { 
      nombre: datacompra.nombreProvedor,
      telefono:0,
      estado:1
      // categoria: dataInsumo.nombreCategoria,
     }
    );
}

    await sequelize.transaction(async (t) => {
      const insumos = datacompra.insumo || [];

      let compraValida = true;

      for (const insumo of insumos) {
        const insumoActual = await Insumo.findByPk(insumo.fk_insumo);

        if (!insumoActual || insumoActual.cantidad < 0) {
          compraValida = false;
          break;
        }
      }

      if (compraValida) {
        const createdCompra = await Compras.create(
          {
            fk_proveedor: proveedorId.id_proveedores,
            cantidad: datacompra.cantidad,
            fecha: datacompra.fecha,
            total: datacompra.total,
          },
          { transaction: t }
        );

        for (const insumo of insumos) {
          await Compras_detalle.create(
            {
              fk_compra: createdCompra.id_compra,
              fk_insumo: insumo.fk_insumo,
              cantidad: insumo.cantidad,
              precio: insumo.precio,
              iva: insumo.iva,
              subtotal: insumo.subtotal,
            },
            { transaction: t }
          );
          const insumoActual = await Insumo.findByPk(insumo.fk_insumo);
          const nuevaCantidad = insumoActual.cantidad + insumo.cantidad;
          const nuevoPrecio = ((insumoActual.precio * insumoActual.cantidad) + (insumo.precio * insumo.cantidad)) / nuevaCantidad;

          // Actualizar cantidad y precio del insumo
          await Insumo.update(
            {
              cantidad: nuevaCantidad,
              precio: nuevoPrecio,
            },
            { where: { id_insumo: insumo.fk_insumo }, transaction: t }
          );
        }

        res.status(201).json(createdCompra);
      } else {
        res.status(400).json({
          error: "No hay suficiente cantidad en stock para realizar la compra o el insumo no existe",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al realizar la compra" });
  }
}


  

  async function listarComprasPorFechas(req, res) {
    try {
      const totalCompras = await Compras.sum('total');
      res.json(totalCompras);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener el total de ventas" });
    }
  }
    
  const { Op , fn, col} = require("sequelize");
  async function listarComprasPorFechasDia(req, res) {
    try {
        // Consulta todas las compras agrupadas por mes
        const ventasPorMes = await Compras.findAll({
            attributes: [
                [fn('MONTH', col('fecha')), 'mes'],
                [fn('SUM', col('total')), 'totalComprasMes']
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
            mesesFaltantes.push({ mes: obtenerNombreMes(i), totalComprasMes: ventaEnMes.getDataValue('totalComprasMes') });
        } else {
            mesesFaltantes.push({ mes: obtenerNombreMes(i), totalComprasMes: 0 });
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
    const ventasPorDiaSemana = await Compras.findAll({
      attributes: [
        [fn('DAYOFWEEK', col('fecha')), 'diaSemana'],
        [fn('SUM', col('total')), 'totalComprasDia']
      ],
      where: {
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
          diasFaltantes.push({ diaSemana: obtenerNombreDiaSemanas(i), totalComprasDia: ventaEnDia.getDataValue('totalComprasDia') });
      } else {
          diasFaltantes.push({ diaSemana: obtenerNombreDiaSemanas(i), totalComprasDia: 0 });
      }
  }
  return diasFaltantes;
}




module.exports={
    listarCompras,
    crearCompras,
    listarcompra,
    listarComprasPorFechas,
    listarComprasPorFechasDia,
    listarComprasPorFechasDias
}