const sequelize=require("../database/db")

const Orden=require("../models/Ficha_Tecnica/FichaTecnica")
const Insumo=require("../models/Insumo")
const DetalleOrden=require("../models/Ficha_Tecnica/DetalleFichaTecnica")


const fs = require('fs')
const { request } = require("express");

async function listarFichasTecnicas(req, res){
    try {
        const orden = await Orden.findAll();
       
      res.json(orden);
        // res.json(fichaTecnica);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Error al obtener produtos'});
        
    }
}

async function listarFichaTecnica(req, res) {
  const  {id_ft}  = req.params;

  try {
    const ficha = await Orden.findOne({
      where: {id_ft: id_ft},
    });

    if (!ficha) {
      return res.status(404).json({ error: "ficha no encontrada" });
    }

    const detalleFicha = await DetalleOrden.findAll({
      where: { fk_ficha_tecnica: ficha.id_ft },
      attributes: [
        "id_detalle_ft",
        "fk_insumo",
        "cantidad",
        "precio",
       
      ],
      include: [
        {
          model: Insumo,
          attributes: ["nombre"],
        },
      ],
    });

    const fichaConDetalles = {
      ...ficha.toJSON(),
      detalles: detalleFicha,
    };

    res.json(fichaConDetalles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la ficha" });
  }
}


async function crearFichaTecnica(req, res) {
    try {
      const dataFicha = req.body;

      if(!req.file) {
        return res.json({ message: "Error la imagen del producto es requerida" });
    }
    const existeNombre = await Orden.findOne({
      where: {
        nombre_ficha: dataFicha.nombre_ficha,
      },
    });

    if (existeNombre) {
      return res.status(400).json({ error: "El nombre de la ficha técnica ya está registrado" });
    }
      await sequelize.transaction(async (t) => {
        const insumos = dataFicha.insumo || [];
  
        let fichaValida = true;
  
        for (const insumo of insumos) {
          const insumoActual = await Insumo.findByPk(insumo.fk_insumo);
  
          if (!insumoActual || insumoActual.cantidad < insumo.cantidad || insumoActual.cantidad === 0) {
            fichaValida = false;
            break;
          }
        }
  
        if (fichaValida) {
          const createdFicha = await Orden.create(
            {
              nombre_ficha:dataFicha.nombre_ficha,
              imagen_producto_final:req.file.filename,
              costo_final_producto:dataFicha.costo_final_producto,
              detalle: dataFicha.detalle,
              mano_obra:dataFicha.mano_obra,
              estado: 1,
              
              // nombre_ficha:dataFicha.nombre_ficha,
              // imagen_producto_final:dataFicha.imagen_producto_final,
              // costo_final_producto: dataFicha.costo_final_producto,
              // detalle: dataFicha.detalle,
              // estado: 1,
            },
            { transaction: t }
          );
  
          for (const insumo of insumos) {

            await DetalleOrden.create(
              {
                
                fk_insumo: insumo.fk_insumo,
                fk_ficha_tecnica: createdFicha.id_ft,
                cantidad: insumo.cantidad,
                precio: insumo.precio,
               
              },
              { transaction: t }
            );
  
            // await Insumo.update(
            //   {
            //     cantidad: sequelize.literal(
            //       `cantidad - ${insumo.cantidad}`
            //     ),
            //   },
            //   { where: { id_insumo: insumo.fk_insumo }, transaction: t }
            // );
          }
  
          res.status(201).json(createdFicha);
        } else {
          res.status(400).json({
            error: "No hay suficiente cantidad en stock para realizar la ficha",
          });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al realizar la compra" });
    }
  }


  async function actualizarFichaTecnica(req, res) {
    const id = req.params.id;
    const { nombre_ficha, imagen_producto_final, costo_final_producto,detalle, mano_obra,detalles } = req.body; // Asumiendo que `detalles` es un array de detalles de la ficha técnica
  
    try {
      const fichaTecnicaExistente = await Orden.findByPk(id);
      if (!fichaTecnicaExistente) {
        return res.status(404).json({ error: 'Ficha Técnica no encontrada' });
      }
  
      // Actualiza la ficha técnica principal
      await fichaTecnicaExistente.update({
        nombre_ficha,
        imagen_producto_final,
        costo_final_producto,
        mano_obra,
        detalle
        // Omitir actualizar 'detalle' directamente aquí, ya que lo manejaremos por separado
      });
  
      // Actualizar los detalles de la ficha técnica
      // Esto es un esquema básico, necesitarás ajustarlo a tu lógica de negocio específica
      if (detalles && detalles.length > 0) {
        // Eliminar detalles existentes, una opción es eliminarlos todos y volver a insertar
        // Otra opción es actualizar los existentes y añadir los nuevos
        await DetalleOrden.destroy({
          where: { fk_ficha_tecnica: id }
        });
  
        // Insertar los nuevos detalles
        for (const detalle of detalles) {
          await DetalleOrden.create({
            fk_ficha_tecnica: id,
            fk_insumo: detalle.fk_insumo,
            cantidad: detalle.cantidad,
            precio: detalle.precio,
            // Agrega los campos necesarios según tu modelo
          });
        }
      }
  
      res.status(200).json({ message: 'Ficha Técnica actualizada con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar la Ficha Técnica' });
    }
  }
  

async function eliminarFichaTecnica(req, res) {
    try {
        const id = req.params.id;
        const responses = await DetalleOrden.destroy({ where: { fk_ficha_tecnica: id } });

        // const fichas_tecnicas = await FichaTecnica.findByPk(id);
        const response = await Orden.destroy({ where: { id_ft: id } });


        // if (!fichas_tecnicas) {
        //     return res.status(404).json({ error: 'Cliente no encontrado' });
        // }

        // // Elimina el cliente
        // await fichas_tecnicas.destroy();
        if (response === 1 || responses ===1) {
          // Si se eliminó correctamente, response será 1.
          res.status(200).json({ message: 'Ficha eliminado con éxito' });
        } else {
          // Si no se encontró el usuario o no se pudo eliminar, response será 0.
          res.status(404).json({ message: 'Ficha no encontrado o no se pudo eliminar' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar cliente' });
    }
}

async function desactivarFichaTecnica(req, res) {
    try {
      const id_ft = req.params.id_ft;
      const cliente = await Orden.findByPk(id_ft);
        
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
        const id_ft = req.params.id_ft;
        const cliente = await Orden.findByPk(id_ft);
        
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