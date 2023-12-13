const sequelize = require("../../database/db");
const Venta = require("../../models/Venta");
const DetalleVenta = require("../../models/DetalleVenta");
const Producto = require("../../models/Producto");
const Cliente = require("../../models/Cliente");

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
            "fk_producto",
            "cantidad",
            "precio",
            "subtotal",
          ],
          include: [
            {
              model: Producto,
              attributes: ["nombre_producto"],
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
        "fk_producto",
        "cantidad",
        "precio",
        "subtotal",
      ],
      include: [
        {
          model: Producto,
          attributes: ["nombre_producto"],
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
        const productoActual = await Producto.findByPk(producto.fk_producto);

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
          },
          { transaction: t }
        );

        for (const producto of productos) {
          await DetalleVenta.create(
            {
              fk_venta: venta.id_venta,
              fk_producto: producto.fk_producto,
              cantidad: producto.cantidad,
              precio: producto.precio,
              subtotal: producto.subtotal,
            },
            { transaction: t }
          );

          await Producto.update(
            {
              cantidad: sequelize.literal(
                `CASE WHEN cantidad >= ${producto.cantidad} THEN cantidad - ${producto.cantidad} ELSE cantidad END`
              ),
            },
            { where: { id_producto: producto.fk_producto }, transaction: t }
          );
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

module.exports = {
  listarVentas,
  listarVenta,
  createVentaConDetalle,
};
