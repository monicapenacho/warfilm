const { verifyToken } = require("../utils/jwt");                   //JWT importo función verifyToken para verificar si el token es ok
const User = require("../api/models/user.model")                   //importar el modelo de usuario

const isAuth = async (req, res, next) => {                         //ver si estás AUTORIZADO (no autenticado) para acceder a una ruta privada
    const authorization = req.headers.authorization                //el token se envía en el header del front
    //En el authorization me va a llegar una respuesta tipo string con el token por ejemplo
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2E0ZDJhNGY1YzE2OTc3YWFlMTQzYSIsImVtYWlsIjoibmFtZXBydWViYTFAZ21haWwuY29tIiwiaWF0IjoxNzI0NTQyMDM5LCJleHAiOjE3MjQ1NDU2Mzl9.CowCzugcEVEOhShlQKuNgFnN-ziOUmuxWKXwtWxfZQM

    if (!authorization) {                                          //si no existe autorización = no me has mandado nada
        return res.json({ message: "No eestá autorizado" })
    }                                                              // función split:
    const token = authorization.split(" ")[1];                     //split: coge un string lo convierte en un array y me qedo con pos 1 (no Bearer)
    if (!token) {                                                  //si no me has enviado token (ej autorización vacío)
        return res.json({ message: "No hay token" })
    }
    const tokenVerify = verifyToken(token);                         //JWT si el token existe procedo a verificar (_id es el de la bd)
    if (!tokenVerify.id) {                                          
        return res.json({ message: "no existe el id del usuario" })
    }
    const logged = await User.findById(tokenVerify.id);             //JWT usuario logeado (importar su modelo de datos) (test7) //es una información intermedia y a continuación se ejecuta el controlador
    req.dataUser = logged;                                          //guarda datos de usuario
    next()                                                          // esta función continúa con el controlador
}

const isAdmin = async (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.json({ message: "No eestá autorizado" })
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        return res.json({ message: "No hay token" })
    }
    const tokenVerify = verifyToken(token);
    if (!tokenVerify.id) {
        return res.json({ message: "no existe el id del usuario" })
    }
    const logged = await User.findById(tokenVerify.id);
    if (logged.role !== "admin") {                                      //Si el usuario no es un admin => no tiene permisos y no puede acceder
        return res.json({ message: "Tu rol no es admin, y no tienes permisos" })            //(test8)
    }
    req.dataUser = logged;
    next()
}
module.exports = { isAuth, isAdmin };




