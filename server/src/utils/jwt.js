const jwt = require("jsonwebtoken");                                           //JWT importar la dependencia


const generateToken = (data) => {                                              //JWT función para crear el Token (función sign)
    //Pasar por parámetro email y id: data--> {id, email}
    return jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })     //parámetros: (*)
}                                                                               //(data, clavesecretaJWT, opcional:tiempo que expira)

const verifyToken = (token) => {                                               //JWT función para validar el Token (función verify)
    return jwt.verify(token, process.env.JWT_SECRET_KEY)                       // parámetro: (token, clavesecreta)
}

module.exports = { generateToken, verifyToken };



//(*) si no se pusiera tiempo de expiración, el token expirará cuando se haga logout 