const DetalleVenta = require("../../models/DetalleVenta")
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

async function detalleOne(req, res) {
    const { id_detalle_venta } = req.params;

    try {
        const detalle = await DetalleVenta.findOne({
            where: { id_detalle_venta },
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

        if (!detalle) {
            return res.status(404).json({ error: 'Detalle de venta no encontrado' });
        }

        res.json(detalle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener detalle de venta' });
    }
}

module.exports = {
    mostrarDetalle,
    detalleOne
}