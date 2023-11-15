const permiso=require("../../models/rol/Permiso")

async function listarPermiso(req, res){

    try {
        const rol = await permiso.findAll();
        res.json(rol);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los permisos' });
      }
    }

module.exports={
listarPermiso
}    