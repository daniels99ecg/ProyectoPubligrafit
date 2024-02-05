const sequelize=require("../database/db")

const FichaTecnica=require("../models/Ficha_Tecnica/FichaTecnica")
const Insumo=require("../models/Insumo")
const DetalleFichaTecnica=require("../models/Ficha_Tecnica/DetalleFichaTecnica")



async function listarFichasTecnicas(req, res){
    try {
        const fichaTecnica = await FichaTecnica.findAll();
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

async function crearFichaTecnica(req, res) {
    try {
      const dataFicha = req.body;
  
      await sequelize.transaction(async (t) => {
        const insumos = dataFicha.insumo || [];
  
        let fichaValida = true;
  
        for (const insumo of insumos) {
          const insumoActual = await Insumo.findByPk(insumo.fk_insumo);
  
          if (!insumoActual || insumoActual.cantidad < insumo.cantidad) {
            fichaValida = false;
            break;
          }
        }
  
        if (fichaValida) {
          const createdFicha = await FichaTecnica.create(
            {
              nombre_ficha:dataFicha.nombre_ficha,
              imagen_producto_final: dataFicha.imagen_producto_final,
              costo_final_producto: dataFicha.costo_final_producto,
              detalle: dataFicha.detalle,
              estado: 1,
            },
            { transaction: t }
          );
  
          for (const insumo of insumos) {

            await DetalleFichaTecnica.create(
              {
                
                fk_insumo: insumo.fk_insumo,
                fk_ficha_tecnica: createdFicha.id_ft,
                cantidad: insumo.cantidad,
                costo_insumo: insumo.costo_insumo,
               
              },
              { transaction: t }
            );
  
            await Insumo.update(
              {
                cantidad: sequelize.literal(
                  `cantidad - ${insumo.cantidad}`
                ),
              },
              { where: { id_insumo: insumo.fk_insumo }, transaction: t }
            );
          }
  
          res.status(201).json(createdFicha);
        } else {
          res.status(400).json({
            error: "No hay suficiente cantidad en stock para realizar la compra",
          });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al realizar la compra" });
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