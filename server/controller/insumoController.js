const Insumo=require("../models/Insumo")
const DetalleOrden=require("../models/Ficha_Tecnica/DetalleFichaTecnica")
const Compras_detalle=require('../models/Detalle_Compra/Detalle_Compra')
const Categoria=require('../models/Categoria')
const { Op } = require('sequelize');

async function listarInsumos(req, res){
    try {
        const insumo = await Insumo.findAll({
            attributes: [
              "id_insumo",
              "nombre",
              "precio",
              "cantidad",
              "fk_categoria",
              "presentacion",
              "estado"
            ],
            include: [
              {
                model: Categoria,
                attributes: ["categoria"],
              },
            ],
          });

        const clientesConVentas = await Promise.all(insumo.map(async (insumo) => {
            const ventasAsociadas = await Compras_detalle.findOne({
                where: {
                    fk_insumo: insumo.id_insumo, 
                },
            });
            const detalleFichaTecnica = await DetalleOrden.findOne({
                where: { fk_insumo: insumo.id_insumo },
            });
            return {
                ...insumo.toJSON(),
                tieneVentas: !!ventasAsociadas,
                detalleFichaTecnica:  !!detalleFichaTecnica

            };
        }));
        res.json(clientesConVentas);
        // res.json(insumo);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Error al obtener insumos'});
        
    }
}

async function listarInsumo(req, res){
    try {
        const id=req.params.id;

        const insumo = await Insumo.findOne({
           where:{
            id_insumo:id
           },
           include:[
            {
                model:Categoria,
                attributes:["categoria"]
            }
           ]
        
        });

        res.json(insumo);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Error al obtener insumo'});
    }
}


async function listarCategoria(req, res) {
    try {
        const categoria = await Categoria.findAll();
        res.json(categoria);
      
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Error al obtener la categoria'});
        
    }
}



async function crearInsumo(req, res){
    try {
        const dataInsumo=req.body 

        const existingInsumo = await Insumo.findOne({
            where: { nombre: dataInsumo.nombre }
          });
      
          if (existingInsumo) {
            // Si el ID de usuario ya existe, muestra una alerta
            return res.status(400).json({ error: 'el nombre del insumo ya existe' });
          }


                 // Verificar si la categoría ya existe o crearla
                let categoria = await Categoria.findOne({
                    where: { categoria: dataInsumo.nombreCategoria }
                });

                if (!categoria) {
                    // Si la categoría no existe, la crea
                    categoria = await Categoria.create({ categoria: dataInsumo.nombreCategoria });
                }

        const insumo = await Insumo.create({
        id_insumo:dataInsumo.id_insumo,
        nombre:dataInsumo.nombre,
        precio:0,
        cantidad:0,
        fk_categoria:categoria.id_categoria,
        presentacion:dataInsumo.presentacion,
        estado:1
            
        })
        res.status(201).send(insumo)
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Error al crear insumo'});
        
    }
}

async function actualizarInsumo(req, res) {
    try {
        const id =req.params.id;
        const insumo =req.body;

             const existingRol = await Insumo.findOne({
              where: { nombre: insumo.nombre, id_insumo:{[Op.ne]: id} }
            });
        
            if (existingRol) {
              // Si el ID de usuario ya existe, muestra una alerta
              return res.status(400).json({ error: 'el nombre del insumo ya existe' });
            }

        const insumoExistente = await Insumo.findByPk(id);
        if (!insumoExistente) {
            return res.status(404).json({ error: 'Insumo no encontrado' });
        }
        await insumoExistente.update(
            {
                nombre:insumo.nombre,
                precio:insumo.precio,
                cantidad:insumo.cantidad,
                fk_categoria:insumo.fk_categoria,
                presentacion:insumo.presentacion
                
            },
            {
                where: { id_insumo:insumoExistente.id_insumo }
            }
        );
        res.status(201).send(insumo)
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al actualizar insumo'});
    }
}

async function eliminarInsumo(req, res) {
    try {
        const id = req.params.id;
        const insumo = await Insumo.findByPk(id);

        if (!insumo) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Elimina el cliente
        await insumo.destroy();

        res.json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar cliente' });
    }
}

async function desactivarInsumo(req, res) {
    try {
      const id = req.params.id;
      const cliente = await Insumo.findByPk(id);
        
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
  
        // Actualiza el estado del cliente a "deshabilitado" (false)
        await cliente.update({ estado: false });
  
        res.status(200).json({ message: 'Cliente deshabilitado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al deshabilitar cliente' });
    }
  }
  
  async function activarInsumo(req, res) {
    try {
        const id = req.params.id;
        const cliente = await Insumo.findByPk(id);
        
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
  
        await cliente.update({ estado: true });
  
        res.status(200).json({ message: 'Cliente habilitado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al habilitar cliente' });
    }
  }





module.exports ={
    listarInsumos,
    listarInsumo,
    crearInsumo,
    actualizarInsumo,
    eliminarInsumo,
    desactivarInsumo,
    activarInsumo,
    listarCategoria
}

