const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//storage es el almacén creado para pasar las restricciones = configuración de cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'war',                                            //nombre carpeta donde se guardan las imágenes
        allowedFormats: ['jpg', 'png', 'jpeg', 'webp', 'gif', 'avif'],   //tipo de ficheros que necesito: formatos que se habilitan
    },
});

const upload = multer({ storage });                             //con multer se envía información del formulario a cloudinary
module.exports = upload;                                        //exportar para poder usuarlo