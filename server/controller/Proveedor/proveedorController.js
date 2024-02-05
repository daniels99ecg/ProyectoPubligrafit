const Proveedores = require("../../models/Proovedor/Proovedor")


async function listarProveedor(req, res){
    try {
        const proveedor=await Proveedores.findAll()
        res.json(proveedor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los Proveedores' });
    }
}


module.exports={
    listarProveedor
}
