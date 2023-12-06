const Producto=require("../../models/Producto")
const Categoria = require("../../models/Categoria")

async function listarProductos(req, res){
    try {
        const producto = await Producto.findAll({
            include:[
                {
                    model:Categoria,
                    atributes: ['categoria']
                },
            ],

            atributes:[
                'id_producto',
                'fk_categoria',
                'nombre_producto',
                'precio',
                'imagen',
                'stock',
                'estado'
            ]
        });
        res.json(producto);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Error al obtener produtos'});
        
    }
}

async function listarProducto(req, res){
    try {
        const id=req.params.id;
        const producto = await Producto.findByPk(id);
        res.json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Error al obtener produto'});
    }
}

async function crearProducto(req, res){
    try {
        const dataProducto=req.body 
        const producto = await Producto.create({
            id_producto:dataProducto.id_producto,
            fk_categoria:dataProducto.fk_categoria,
            nombre_producto:dataProducto.nombre_producto,
            precio:dataProducto.precio,
            imagen:dataProducto.imagen,
            stock:dataProducto.stock,
            estado:dataProducto.estado
        })
        res.status(201).send(producto)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Error al crear producto'});
        
    }
}

async function actualizarProducto(req, res) {
    try {
        const id =req.params.id;
        const producto =req.body;
        const productoExistente = await Producto.findByPk(id);
        if (!productoExistente) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        await productoExistente.update(
            {
                nombre_producto:producto.nombre_producto,
                precio:producto.precio,
                // imagen:producto.imagen,
                stock:producto.stock,
                estado:producto.estado
            },
            {
                where: { id_producto: productoExistente.id_producto }
            }
        );
        res.status(201).send(producto)
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al actualizar producto'});
    }
}

async function eliminarProducto(req, res) {
    try {
        const id = req.params.id;
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Elimina el cliente
        await producto.destroy();

        res.json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar cliente' });
    }
}

async function desactivarProducto(req, res) {
    try {
      const id = req.params.id;
      const producto = await Producto.findByPk(id);
        
        if (!producto) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
  
        // Actualiza el estado del cliente a "deshabilitado" (false)
        await producto.update({ estado: false });
  
        res.status(200).json({ message: 'Cliente deshabilitado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al deshabilitar cliente' });
    }
  }
  
  async function activarProducto(req, res) {
    try {
        const id = req.params.id;
        const producto = await Producto.findByPk(id);
        
        if (!producto) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
  
        await producto.update({ estado: true });
  
        res.status(200).json({ message: 'Cliente habilitado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al habilitar cliente' });
    }
  }



module.exports ={
    listarProductos,
    listarProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    activarProducto,
    desactivarProducto
}