const express = require("express");
const router = express.Router()
const {  addUser, login, getProfile, deleteUser, addFilmToUser, addEraToUser, getUserById, deleteFilmUser, deleteEraUser } = require("../controllers/user.controllers")
const upload = require("../../middleware/upload")                  //cloudinary
const { isAuth, isAdmin } = require("../../middleware/auth")       //JWT: importar funciones: Autorización, isAdmin

router.post("/add", upload.single("image"), addUser);              //cloudinary: incluir en la ruta un parámetro intermedio upload.single("image"), una vez subida la imagen a cloudinary devolverá una ruta que se recoge en el controlador

router.post("/login", login);                                       //JWT. Ruta para enviar datos sensibles (formulario)

//ver perfil de usuario - rutas privadas (parámetro middleware: verificar que se está autenticado)

router.get("/profile", [isAuth], getProfile);                      //JWT: Autorización. [] porque puede ser más de una
router.delete("/deleteuser", [isAdmin], deleteUser);               //JWT Autorizado + administrador 

router.get("/", [isAuth], getUserById);  
router.delete("/deletfilmeuser", [isAdmin], deleteFilmUser);
router.delete("/deleteraeuser", [isAdmin], deleteEraUser);
router.post("/addfilmuser", [isAdmin], addFilmToUser);
router.post("/adderause", [isAdmin], addEraToUser); 

module.exports = router










