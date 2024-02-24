const Proveedores = require("../../models/Proovedor/Proovedor")


async function listarProveedor(req, res){
    try {
        const proveedor=await Proveedores.findAll()
        const proveedoresUnicos = new Set();
 // Filtrar roles duplicados y almacenar solo un rol por nombre
 const rolesFiltrados = proveedor.filter(proveedor => {
    if (!proveedoresUnicos.has(proveedor.nombre)) {
        proveedoresUnicos.add(proveedor.nombre);
      return true;
    }
    return false;
  });
        res.json(rolesFiltrados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los Proveedores' });
    }
}


async function listaRoles(req, res){
    try {
      const roles = await Rol.findAll();
      
      // Utilizar un conjunto para almacenar nombres únicos de roles
      const rolesUnicos = new Set();
  
      // Filtrar roles duplicados y almacenar solo un rol por nombre
      const rolesFiltrados = roles.filter(rol => {
        if (!rolesUnicos.has(rol.nombre_rol)) {
          rolesUnicos.add(rol.nombre_rol);
          return true;
        }
        return false;
      });
  
      res.json(rolesFiltrados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  }

module.exports={
    listarProveedor
}
