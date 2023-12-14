const Insumo=require("../models/Insumo")
const Ficha=require("../models/FichaTecnica")

async function listarInsumos(req, res){
    try {
        const insumo = await Insumo.findAll();
        const clientesConVentas = await Promise.all(insumo.map(async (insumo) => {
            const ventasAsociadas = await Ficha.findOne({
                where: {
                    fk_insumo: insumo.id_insumo, 
                },
            });
  
            return {
                ...insumo.toJSON(),
                tieneVentas: !!ventasAsociadas,
            };
        }));
        res.json(clientesConVentas);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Error al obtener insumos'});
        
    }
}

async function listarInsumo(req, res){
    try {
        const id=req.params.id;
        const insumo = await Insumo.findByPk(id);
        res.json(insumo);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Error al obtener insumo'});
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
        const insumo = await Insumo.create({
        id_insumo:dataInsumo.id_insumo,
        nombre:dataInsumo.nombre,
        precio:0,
        cantidad:0,
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
        const insumoExistente = await Insumo.findByPk(id);
        if (!insumoExistente) {
            return res.status(404).json({ error: 'Insumo no encontrado' });
        }
        await insumoExistente.update(
            {
                nombre:insumo.nombre,
                precio:insumo.precio,
                cantidad:insumo.cantidad,
                
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
    activarInsumo
}

