const FichaTecnica=require("../models/FichaTecnica")
const Insumo=require("../models/Insumo")

async function listarFichasTecnicas(req, res){
    try {
        const fichaTecnica = await FichaTecnica.findAll({

            include:[
                {
                    model:Insumo,
                    atributes: ['nombre']
                },
            ],

            atributes:[
                'id_ft',
                'fk_insumo',
                'cantidad_insumo',
                'costo_insumo',
                'imagen_producto_final',
                'costo_producto_final',
                'detalle'
            ]
    });
        res.json(fichaTecnica);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Error al obtener produtos'});
        
    }
}

async function listarFichaTecnica(req, res){
    try {
        const id=req.params.id;
        const fichaTecnica = await FichaTecnica.findByPk(id);
        res.json(fichaTecnica);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Error al obtener produto'});
    }
}

async function crearFichaTecnica(req, res){
    try {
        const dataFichaTecnica=req.body 
        const fichaTecnica = await FichaTecnica.create({
            id_ft: dataFichaTecnica.id_ft,
            fk_insumo: dataFichaTecnica.fk_insumo,
            cantidad_insumo: dataFichaTecnica.cantidad_insumo,
            costo_insumo: dataFichaTecnica.costo_insumo,
            imagen_producto_final: dataFichaTecnica.imagen_producto_final,
            costo_final_producto: dataFichaTecnica.costo_final_producto,
            detalle: dataFichaTecnica.detalle
        })
        res.status(201).send(fichaTecnica)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Error al crear fichaTecnica'});
        
    }
}

async function actualizarFichaTecnica(req, res) {
    try {
        const id =req.params.id;
        const fichaTecnica =req.body;
        const fichaTecnicaExistente = await FichaTecnica.findByPk(id);
        if (!fichaTecnicaExistente) {
            return res.status(404).json({ error: 'FichaTecnica no encontrado' });
        }
        await fichaTecnicaExistente.update(
            {   
                fk_insumo: fichaTecnica.fk_insumo,
                cantidad_insumo: fichaTecnica.cantidad_insumo,
                costo_insumo:  fichaTecnica.costo_insumo,
                imagen_producto_final: fichaTecnica.imagen_producto_final,
                costo_final_producto:  fichaTecnica.costo_final_producto,
                detalle:  fichaTecnica.detalle
            },
            {
                where: { id_ft: fichaTecnicaExistente.id_ft }
            }
        );
        res.status(201).send(fichaTecnica)
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al actualizar fichaTecnica'});
    }
}    

module.exports ={
    listarFichasTecnicas,
    listarFichaTecnica,
    crearFichaTecnica,
    actualizarFichaTecnica
}