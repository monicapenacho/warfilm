// console.log("este es el seed");  
// cuando lo quiera ejecutar tengo que poner npm run + el nombre que haya puesto en el script del package jason que es seed por tanto npm run seed (test10)
const mongoose = require("mongoose");            //importar mongoose para poder ejecutar una función de la base de datos
const Era = require('../models/era.model');      // se necesita el modelo de datos

require('dotenv').config()   //importar y configurar dotenv para poder conectarme con.env y con url a la bd

const arrayEra = [
  {
    name: 'Griega',
  },
  {
    name: 'Romana',
  },
  {
    name: 'Edad Media',
  },
  {
    name: 'Epoca Moderna',
  },
  {
    name: 'Epoca Contemporánea',
  },
];


// mongoose.connect(process.env.DB_URL)     //función de mongoose connect para conectar con bd
//   .then(() => {                          // la función es asíncrona
//     console.log("se ha conectado")        //(test11)
//   })                                    

mongoose.connect(process.env.DB_URL)     //función dea mongoose connect para conectar con bd. La función es asíncrona
  .then( async () => {         
    console.log("se ha conectado")        // test 11)               
    const allEras = await Era.find()
    if(allEras.length !==0) {         //si hay datos bórralos (otra función asíncrona)
      await Era.collection.drop()      //drop borra la colección
    }                    
    
  })
  .catch((err)=>{console.log("error al borrar")})  //capturar el error por si se rompe (opcional)
  .then(async ()=>{                         //ver nota1
    const erasDocs = arrayEra.map((eachEra) => new Era(eachEra) )
    await Era.insertMany(erasDocs)
  })
  .catch((err)=>{console.log("error al insertar")})  //capturar el error por si se rompe (opcional)
  .finally(() => mongoose.disconnect())          //cuando finalice desconecta de bd mongo db (opcional)



    // (nota 1).then(async ()=>{})    //una vez borrados datos tengo que insertar los nuevos datos en bd con promesas (ir a bd y esperar una respuesta) ( asíncrona). Mongodb necesita documentos. Tener en cuenta que son muchos documentos por tanto tengo que recorrer un array de objetos y convertirlo en un array de documentos (función map). El map recibe una función y tengo que retornar lo que me interesa. Dentro d elos paréntesis del map = (cada personaje). con cada personaje se crea el documento con new + instancia modelo de datos + parámetros = cada personaje. Insert many es una función asíncrona por lo que se pone await

    //script "seed": "node src/api/seeds/era.seed.js"