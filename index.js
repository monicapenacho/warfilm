const express = require("express");
const { connectDB } = require("./src/utils/db")
const router = require("./src/api/routes/film.routes")
const routerUser = require("./src/api/routes/user.routes")
const routerEra = require("./src/api/routes/era.routes")
const env = require("dotenv")
env.config()                                                    //configurar variables de entorno

const cloudinary = require("cloudinary").v2                     //importar cloudinary
cloudinary.config({                                             //configurar cloudinary con sus parámetros (que están en .env)
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const cors = require("cors")        //instalar dependencia cors

connectDB();
const server = express();
const PORT = process.env.PORT;                                  // usamos la variable de entorno PORT
server.use(cors())              //habilita que cualquier ruta pueda hacer peticiones a este servidor
server.use(express.json())
server.use("/", router)                                         //film
server.use("/user", routerUser)                                 //user
server.use("/era", routerEra)                                   //Era

server.listen(PORT, () => {
    console.log(`listen port http://localhost:${PORT} `)
})




