const multer = require('multer');

/// Importamos la configuración del multer
const configurarMulter = require('../database/multerConfig');


//* Función para subir un archivo a la carpeta 'disenos'
const subirArchivoFicha = (req, res, next) => {

    //- Pasar la configuración y el nombre del campo como se llama en la tabla
    const upload = multer(configurarMulter('imagenFicha')).single('imagen_producto_final');

    upload(req, res, function (error) {
        if (error) {
            return res.json({ mensaje: error });
        }
        return next();
    });
};

module.exports = {subirArchivoFicha}