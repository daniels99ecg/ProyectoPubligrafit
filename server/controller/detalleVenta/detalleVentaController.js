const DetalleVenta = require("../../models/DetalleVenta");
const Producto = require("../../models/Producto");

async function mostrarDetalle(req, res) {
    try {
        const detalles = await DetalleVenta.findAll({
            include: [
                { model: Producto, attributes: ['nombre_producto'] }
            ], 
            attributes: [
                'id_detalle_venta',
                'fk_venta',
                'fk_producto',
                'cantidad',
                'precio',
                'subtotal'
            ]
        });

        res.json(detalles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener detalle de venta' });
    }
}

module.exports = {
    mostrarDetalle
}