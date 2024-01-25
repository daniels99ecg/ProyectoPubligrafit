const Compras=require("../../models/Compras/Compras")
const sequelize=require("../../database/db")
const Compras_detalle=require('../../models/Detalle_Compra/Detalle_Compra')
const Insumo = require("../../models/Insumo");


// async function listarCompras(req, res){
//     try {
//         const compras=await Compras.findAll()
//         res.json(compras)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({error:"Error al obtener las compras"})
//     }
// }

async function listarCompras(req, res) {
  try {
        const compras=await Compras.findAll()

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
        },
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
  
      await sequelize.transaction(async (t) => {
        const insumos = datacompra.insumo || [];
  
        let compraValida = true;
  
        for (const insumo of insumos) {
          const insumoActual = await Insumo.findByPk(insumo.fk_insumo);
  
          if (!insumoActual || insumoActual.cantidad > insumo.cantidad) {
            compraValida = false;
            break;
          }
        }
  
        if (compraValida) {
          const createdCompra = await Compras.create(
            {
              proveedor: datacompra.proveedor,
              cantidad: 0,
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
  
            await Insumo.update(
              {
                cantidad: sequelize.literal(
                  `cantidad + ${insumo.cantidad}`
                ),
              },
              { where: { id_insumo: insumo.fk_insumo }, transaction: t }
            );
          }
  
          res.status(201).json(createdCompra);
        } else {
          res.status(400).json({
            error: "No hay suficiente cantidad en stock para realizar la compra",
          });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al realizar la compra" });
    }
  }
  
module.exports={
    listarCompras,
    crearCompras,
    listarcompra
}