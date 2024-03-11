const sequelize = require("../../database/db");
const Venta = require("../../models/Venta");
const DetalleVenta = require("../../models/DetalleVenta");
const Cliente = require("../../models/Cliente");
const Orden = require("../../models/Ficha_Tecnica/FichaTecnica");

// 
async function listarVentas(req, res) {
  try {
    const ventas = await Venta.findAll({
      attributes: [
        "id_venta",
        "fk_id_cliente",
        "metodo_pago",
        "fecha",
        "total",
        "vendedor"
      ],
      include: [
        {
          model: Cliente,
          attributes: ["nombre", "apellido", "documento"],
        },
      ],
    });

    const ventasConDetalles = await Promise.all(
      ventas.map(async (venta) => {
        const detalleVenta = await DetalleVenta.findAll({
          where: { fk_venta: venta.id_venta },
          attributes: [
            "id_detalle_venta",
            "fk_ordenes",
            "cantidad",
            "precio",
            "subtotal",
          ],
          include: [
            {
              model: Orden,
              attributes: ["nombre_ficha"],
             
            },
          ],
        });

        return {
          ...venta.toJSON(),
          detalles: detalleVenta,
        };
      })
    );

    res.json(ventasConDetalles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las ventas" });
  }
}

async function listarVenta(req, res) {
  const { id_venta } = req.params;

  try {
    const venta = await Venta.findOne({
      where: { id_venta: id_venta },
      attributes: [
        "id_venta",
        "fk_id_cliente",
        "metodo_pago",
        "fecha",
        "total",
        "vendedor"
      ],
      include: [
        {
          model: Cliente,
          attributes: ["nombre", "apellido", "documento"],
        },
      ],
    });

    if (!venta) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }

    const detalleVenta = await DetalleVenta.findAll({
      where: { fk_venta: id_venta },
      attributes: [
        "id_detalle_venta",
        "fk_ordenes",
        "cantidad",
        "precio",
        "subtotal",
      ],
      include: [
        {
          model: Orden,
          attributes: ["nombre_ficha"],
         
        },
      ],
    });

    const ventaConDetalles = {
      ...venta.toJSON(),
      detalles: detalleVenta,
    };

    res.json(ventaConDetalles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la venta" });
  }
}




async function createVentaConDetalle(req, res) {
  try {
    const dataVenta = req.body;

    await sequelize.transaction(async (t) => {
      const productos = dataVenta.productos || [];

      let ventaValida = true;

      for (const producto of productos) {
        const productoActual = await Orden.findByPk(producto.fk_ordenes);

        if (!productoActual || productoActual.cantidad < producto.cantidad) {
          ventaValida = false;
          break;
        }
      }

      if (ventaValida) {
        const venta = await Venta.create(
          {
            fk_id_cliente: dataVenta.id_cliente.fk_id_cliente,
            metodo_pago: dataVenta.metodo_pago,
            fecha: dataVenta.fecha,
            total: dataVenta.total,
            vendedor:dataVenta.vendedor
          },
          { transaction: t }
        );

        for (const producto of productos) {
          await DetalleVenta.create(
            {
              fk_venta: venta.id_venta,
              fk_ordenes: producto.fk_ordenes,
              cantidad: producto.cantidad,
              precio: producto.precio,
              subtotal: producto.subtotal,
            },
            { transaction: t }
          );

          // await Orden.update(
          //   {
          //     cantidad: sequelize.literal(
          //       `CASE WHEN cantidad >= ${producto.cantidad} THEN cantidad - ${producto.cantidad} ELSE cantidad END`
          //     ),
          //   },
          //   { where: { id_producto: producto.fk_producto }, transaction: t }
          // );
        }

        res.status(201).json(venta);
      } else {
        res
          .status(400)
          .json({
            error: "No hay suficiente cantidad en stock para realizar la venta",
          });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al realizar la venta" });
  }
}



//Esto es del dashboard

const { Op , fn, col} = require("sequelize");


async function listarVentasPorFechas(req, res) {
  try {
    const totalVentas = await Venta.sum('total');
    res.json(totalVentas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el total de ventas" });
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
    const totalVentasSemana = await Venta.sum('total', {
      where: {
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
      const ventasPorMes = await Venta.findAll({
          attributes: [
              [fn('MONTH', col('fecha')), 'mes'],
              [fn('SUM', col('total')), 'totalVentasMes']
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
    const ventasPorDiaSemana = await Venta.findAll({
      attributes: [
        [fn('DAYOFWEEK', col('fecha')), 'diaSemana'],
        [fn('SUM', col('total')), 'totalVentasDia']
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
          diasFaltantes.push({ diaSemana: obtenerNombreDiaSemanas(i), totalVentasDia: ventaEnDia.getDataValue('totalVentasDia') });
      } else {
          diasFaltantes.push({ diaSemana: obtenerNombreDiaSemanas(i), totalVentasDia: 0 });
      }
  }
  return diasFaltantes;
}



module.exports = {
  listarVentas,
  listarVenta,
  createVentaConDetalle,
  listarVentasPorFechas,
  listarVentasPorFechasDia,
  listarComprasPorFechasDia,
  listarComprasPorFechasDias
};
