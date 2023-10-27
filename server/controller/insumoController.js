const Insumo=require("../models/Insumo")

async function listarInsumos(req, res){
    try {
        const insumo = await Insumo.findAll();
        res.json(insumo);
        
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
        const insumo = await Insumo.create({
        id_insumo:dataInsumo.id_insumo,
        nombre:dataInsumo.nombre,
        precio:dataInsumo.precio,
        cantidad:dataInsumo.cantidad,
        estado:dataInsumo.estado
            
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

module.exports ={
    listarInsumos,
    listarInsumo,
    crearInsumo,
    actualizarInsumo
}