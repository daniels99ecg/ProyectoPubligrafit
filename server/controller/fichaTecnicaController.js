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
                'costo_final_producto',
                'detalle',
                'estado'
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
                id_ft: fichaTecnica.id_ft,
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

async function eliminarFichaTecnica(req, res) {
    try {
        const id = req.params.id;
        const fichas_tecnicas = await FichaTecnica.findByPk(id);

        if (!fichas_tecnicas) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Elimina el cliente
        await fichas_tecnicas.destroy();

        res.json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar cliente' });
    }
}

async function desactivarFichaTecnica(req, res) {
    try {
      const id = req.params.id;
      const cliente = await FichaTecnica.findByPk(id);
        
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
  
  async function activarFichaTecnica(req, res) {
    try {
        const id = req.params.id;
        const cliente = await FichaTecnica.findByPk(id);
        
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
    listarFichasTecnicas,
    listarFichaTecnica,
    crearFichaTecnica,
    actualizarFichaTecnica,
    eliminarFichaTecnica,
    activarFichaTecnica,
    desactivarFichaTecnica
}