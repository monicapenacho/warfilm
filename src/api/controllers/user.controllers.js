const User = require("../models/user.model")
const bcrypt = require("bcrypt");                                           //encriptación importar función(dependencia) para encriptar contraseña
const { generateToken } = require("../../utils/jwt")                        //JWT importar función creada en middleware JWT para crear el token
const { deleteFile } = require("../../utils/deleteFileCloud")               //Cloudinary

//Registro
const addUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        //console.log(newUser)
        const findUser = await User.find({ email: newUser.email });         //validar si email existe (newUser = req.body) (test2)
        //console.log(req.files.path)
        if (findUser.length === 0) {                                        //verificar si es array vacío = no encuenta al usuario
            if (req.file.path) {
                newUser.image = req.file.path;                              //cloudinary (la ruta de la imagen la guarda
            }                                                               //en una propiedad llamada req.file.path)

            newUser.password = bcrypt.hashSync(newUser.password, 10)        //encriptación de contraseña antes de save (función hashSync)
                                                                            //(parámetro a encriptar, nº de iteraciones de encriptación)(test2)   
            const createdUser = await newUser.save();                       //guardar usuario (text2)
            return res.status(200).json({ message: "Usuario creado", data: createdUser })
        } else {
            return res.status(200).json({ message: "El email ya existe" })
        }
    } catch (error) {
        console.log(error)
    }
}
//autenticación
const login = async (req, res) => {
    try {
        const user = req.body;
        const userByEmail = await User.find({ email: user.email })
        if (userByEmail.length !== 0) {
            if (bcrypt.compareSync(user.password, userByEmail[0].password)) {       //encriptación (función compareSync = comparar el string password con el string de la password que se encriptó en el momento del registro)
                // si coincide => crear el token y retornarlo
                const data = { id: userByEmail[0]._id, email: userByEmail[0].email } //JWT objeto data con los datos que quiero guarder en el token
                const token = generateToken(data)                                   //JWT Ejecutar función de crear Token (1 nuevo con cada login)
                return res.status(200).json({ message: token })                     //JWT en el message devuelve el token (text4)

            } else {
                return res.status(200).json({ message: "La contraseña no coincide" })   //JWT (test5)
            }
        } else {
            return res.status(200).json({ message: "El email no existe " })             //JWT (test6)
        }
    } catch (error) {
        console.log(error)
    }
}

//Autorizacion
const getProfile = (req, res) => {
    // console.log("estoy en el perfil")
    console.log(req.dataUser)
    return res.json({                                                                   // si ok => devuelve name & role del usuario (test7)
        name: req.dataUser.name,
        role: req.dataUser.role,
    })
}

//Borrar
const deleteUser = async (req, res) => {                                                // (test8 error no tiene permisos)
    // id del usuario que quiero eliminar, query
    const { id } = req.query; 
    // findByIdAndDelete
    const deleted = await User.findByIdAndDelete(id)
    if (!deleted) {
        return res.json({ message: "el id no existe" })
    }
    // borrar la foto del cloudinary
    if (deleted.image) {
        deleteFile(deleted.image)                                                       //Cloudinary : (test9)
    }
    // response--> devolver el usuario eliminado
    return res.json(deleted)                                                            // (test9) ok
}

//Añadir película a usuario
const addFilmToUser = async (req, res) => {
        const { idF, idU } = req.params;
        console.log(idF, idU)
    
        const modifyUser = await User.findByIdAndUpdate(
            idU,
            { $push: { film: idF } },
            { new: true })
    
        if (!modifyUser) {
            return res.json({ message: "Usuario no encontrado" })
        } else {
            return res.json({ message: "Usuario modificado con éxito", data: modifyUser })
        }
}

//Añadir era a usuario
const addEraToUser = async (req, res) => {
    const { idF, idU } = req.params;
    console.log(idF, idU)

    const modifyUser = await User.findByIdAndUpdate(
        idU,
        { $push: { film: idF } },
        { new: true })

    if (!modifyUser) {
        return res.json({ message: "Usuario no encontrado" })
    } else {
        return res.json({ message: "Usuario modificado con éxito", data: modifyUser })
    }
}

//obtener un usuario específico basado en su ID
const getUserById = async (req, res) => {
    try {
      const { id } = req.query;
    //   const user = await User.findById(id).populate("film")
      const user = await User.findById(id).populate([
      { path: "film", select: "name" }, // selecciona solo el título del documento 'film'
      { path: "era", select: "name" } // selecciona solo el nombre del documento 'era'
    ]);

      if (!user) {
        return res.json({ messagge: "usuario no existe" })
      } else {
        return res.json({ data: user })
      }
    } catch (error) {
        console.log(error)
    }

}

//Borrar película a usuario
const deleteFilmUser = async (req, res) => {
        const { idF, idU } = req.query;
        //encontrar el usuario y modificarlo
        //$pull --> elimina del array
        const updatedUser = await User.findByIdAndUpdate(
            idU,
            { $pull: { film: idF } }, // $pull permite eliminar un elemnto del array
            { new: true }
        )
        return res.json({ data: updatedUser })
        // buscar al usuario, sacar el elemento del array (filter, splice, slice), guardar los datos del usuario save()
}
    
//Borrar era a usuario
const deleteEraUser = async (req, res) => {
    const { idE, idU } = req.query;
    //encontrar el usuario y modificarlo
    //$pull --> elimina del array
    const updatedUser = await User.findByIdAndUpdate(
        idU,
        { $pull: { era: idE } }, // $pull permite eliminar un elemnto del array
        { new: true }
    )
    return res.json({ data: updatedUser })
    // buscar al usuario, sacar el elemento del array (filter, splice, slice), guardar los datos del usuario save()
}


module.exports = { addUser, login, getProfile, deleteUser, addFilmToUser, addEraToUser, getUserById, deleteFilmUser, deleteEraUser };
