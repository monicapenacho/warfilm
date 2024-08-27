// console.log("este es el seed");  
// cuando lo quiera ejecutar tengo que poner npm run + el nombre que haya puesto en el script del package jason que es seed por tanto npm run seed (test10)
const mongoose = require("mongoose");            //importar mongoose para poder ejecutar una función de la base de datos
const Film = require('../models/film.model');      // se necesita el modelo de datos

require('dotenv').config()   //importar y configurar dotenv para poder conectarme con.env y con url a la bd

const arrayFilms = [
  {
      name: "Los_300",
      year: 2006,
      director: "Zack Snyder",
      synopsis: "Narra la historia de la Batalla de las Termópilas, donde el rey Leónidas y 300 espartanos se enfrentaron al ejército persa de Jerjes.",
      runtime: 117,
      countries: ["Estados Unidos"],
      genre: "Historia militar",
      image: "https://c8.alamy.com/comp/2EXMJNM/300-prepare-for-glory!-2006-feat-gerard-butler-and-lena-headey-2EXMJNM.jpg",
      war: "Guerras Médicas",
      era: "66cb9e193e3688ccc74bcc39"
  },
  {
      name: "Aníbal",
      year: 1959,
      director: "Carlo Ludovico Bragaglia",
      synopsis: "Cuenta la historia de Aníbal, el gran general cartaginés, y su campaña contra Roma, incluyendo la famosa travesía de los Alpes con elefantes.",
      runtime: 103,
      countries: ["Italia"],
      genre: "Historia militar",
      image: "https://th.bing.com/th/id/R.9deb211ac79f1283b78296bfdc2a124b?rik=DKRTI7bqUPHAng&pid=ImgRaw&r=0",
      war: "Guerras Púnicas I, II, III",
      era: "66cb9e2b3e3688ccc74bcc3c"
  },
  {
      name: "Cartago_en_llamas",
      year: 1960,
      director: "Carmine Gallone",
      synopsis: "Basada en la novela de Emilio Salgari, narra la caída de Cartago durante la Tercera Guerra Púnica.",
      runtime: 104,
      countries: ["Italia"],
      genre: "Historia militar",
      image: "https://pics.filmaffinity.com/cartagine_in_fiamme_carthage_in_flames-388405792-large.jpg",
      war: "Guerras Púnicas I, II, III",
      era: "66cb9e2b3e3688ccc74bcc3c"
  },
  {
      name: "Julio_César",
      year: 1953,
      director: "Joseph L. Mankiewicz",
      synopsis: "Basada en la obra de Shakespeare, se centra en la vida y muerte de Julio César, incluyendo su ascenso al poder y su asesinato.",
      runtime: 120,
      countries: ["Estados Unidos"],
      genre: "Historia militar",
      image: "https://voiretmanger.fr/wp-content/uploads/2020/01/jules-cesar-mankiewicz-1004x1536.jpeg",
      war: "Guerra de las Galias",
      era: "66cb9e2b3e3688ccc74bcc3c" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "Cleopatra",
      year: 1963,
      director: "Joseph L. Mankiewicz",
      synopsis: "Relata la vida de Cleopatra, la última reina de Egipto, y su relación con Julio César y Marco Antonio.",
      runtime: 248,
      countries: ["Estados Unidos"],
      genre: "Historia militar",
      image: "https://th.bing.com/th/id/R.40bb9ded33043178ee259132e14284f2?rik=5fjdYUd1i9W0Yw&pid=ImgRaw&r=0",
      war: "Guerra Civil Octavio Marco Antonio",
      era: "66cb9e2b3e3688ccc74bcc3c" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "Enrique_V",
      year: 1989,
      director: "Kenneth Branagh",
      synopsis: "Basada en la obra de Shakespeare, sigue la historia del rey Enrique V de Inglaterra y su campaña en Francia, culminando en la Batalla de Agincourt.",
      runtime: 137,
      countries: ["Reino Unido"],
      genre: "Historia militar",
      image: "https://th.bing.com/th/id/OIP.DKXwUaOGyG5qrTMQB4y46AAAAA?rs=1&pid=ImgDetMain",
      war: "Guerra de los 100 años",
      era: "66cb9e443e3688ccc74bcc3f" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "Juana_de_Arco",
      year: 1999,
      director: "Luc Besson",
      synopsis: "Narra la vida de Juana de Arco, desde sus visiones hasta su liderazgo en la guerra contra los ingleses y su eventual martirio.",
      runtime: 148,
      countries: ["Francia"],
      genre: "Historia militar",
      image: "https://th.bing.com/th/id/R.210ae62206a56615f8ce5147d174cc6c?rik=CVJRPNczbtj0Bg&pid=ImgRaw&r=0",
      war: "Guerra de los 100 años",
      era: "66cb9e443e3688ccc74bcc3f" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "The_King",
      year: 2019,
      director: "David Michôd",
      synopsis: "Inspirada en las obras de Shakespeare, sigue la vida del rey Enrique V de Inglaterra y su ascenso al trono en medio de conflictos políticos y bélicos.",
      runtime: 140,
      countries: ["Reino Unido", "Estados Unidos"],
      genre: "Historia militar",
      image: "https://th.bing.com/th/id/OIP.UJxapR3sFfqiHe1FhzIqpgHaGj?rs=1&pid=ImgDetMain",
      war: "Guerra de los 100 años",
      era: "66cb9e443e3688ccc74bcc3f" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "Alatriste",
      year: 2016,
      director: "Agustín Díaz Yanes",
      synopsis: "Basada en la serie de novelas de Arturo Pérez-Reverte, sigue las aventuras del capitán Diego Alatriste durante la España del Siglo de Oro.",
      runtime: 145,
      countries: ["España"],
      genre: "Historia militar",
      image: "https://es.web.img3.acsta.net/r_1280_720/medias/nmedia/18/36/26/42/18663441.jpg",
      war: "Guerra de los 30 años",
      era: "66cb9e563e3688ccc74bcc42" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "Barry_Lyndon",
      year: 1975,
      director: "Stanley Kubrick",
      synopsis: "Sigue la vida de Redmond Barry, un joven irlandés del siglo XVIII que busca ascender socialmente a través del ejército y el matrimonio.",
      runtime: 185,
      countries: ["Reino Unido", "Estados Unidos"],
      genre: "Historia militar",
      image: "https://i.pinimg.com/originals/50/9c/2e/509c2e64bfc8749f155a23def439da2a.jpg",
      war: "Guerra de los 7 años",
      era: "66cb9e563e3688ccc74bcc42" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "El_patriota",
      year: 2000,
      director: "Roland Emmerich",
      synopsis: "Durante la Guerra de Independencia de los Estados Unidos, un granjero se convierte en líder rebelde tras la muerte de su hijo.",
      runtime: 165,
      countries: ["Estados Unidos"],
      genre: "Historia militar",
      image: "https://th.bing.com/th/id/OIP.I8qHIxZf_Kn0yK16ty4bKwHaLH?rs=1&pid=ImgDetMain",
      war: "Guerra de independencia americana",
      era: "66cb9e563e3688ccc74bcc42" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "Napoleón",
      year: 2023,
      director: "Ridley Scott",
      synopsis: "La película ofrece una mirada a la vida y ascenso de Napoleón Bonaparte, desde sus inicios hasta convertirse en uno de los líderes militares y políticos más influyentes de la historia. Se centra en su relación con Josefina, su visión de liderazgo, y las campañas militares que definieron su legado.",
      runtime: 158,
      countries: ["Reino Unido", "Estados Unidos"],
      genre: "Historia militar",
      image: "https://th.bing.com/th/id/OIP.5EXzINjCB3ckyWULFjOu3AAAAA?rs=1&pid=ImgDetMain",
      war: "Guerras Napoleónicas",
      era: "66cb9e6e3e3688ccc74bcc45" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "Waterloo",
      year: 1970,
      director: "Sergei Bondarchuk",
      synopsis: "Narra los eventos que llevaron a la batalla de Waterloo y la caída de Napoleón Bonaparte.",
      runtime: 132,
      countries: ["Italia", "Unión Soviética"],
      genre: "Historia militar",
      image: "https://th.bing.com/th/id/OIP.2hLkhi9xzE7d961xi5_EogHaKg?rs=1&pid=ImgDetMain",
      war: "Guerras Napoleónicas",
      era: "66cb9e6e3e3688ccc74bcc45" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "Agustina_de_Aragón",
      year: 1950,
      director: "Juan de Orduña",
      synopsis: "Basada en la figura histórica de Agustina de Aragón, quien defendió Zaragoza durante la Guerra de la Independencia Española contra las tropas napoleónicas.",
      runtime: 124,
      countries: ["España"],
      genre: "Historia militar",
      image: "https://es.web.img2.acsta.net/pictures/16/10/13/11/32/438882.jpg",
      war: "Guerra de independencia americana",
      era: "66cb9e6e3e3688ccc74bcc45" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "1917",
      year: 2019,
      director: "Sam Mendes",
      synopsis: "Durante la Primera Guerra Mundial, dos soldados británicos reciben la misión de entregar un mensaje crucial que evitará un ataque mortal.",
      runtime: 119,
      countries: ["Reino Unido", "Estados Unidos"],
      genre: "Historia militar",
      image: "https://c8.alamy.com/comp/2A49A4F/1917-2019-directed-by-sam-mendes-credit-dreamworks-album-2A49A4F.jpg",
      war: "1 Guerra Mundial",
      era: "66cb9e6e3e3688ccc74bcc45" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "Senderos_de_Gloria",
      year: 1957,
      director: "Stanley Kubrick",
      synopsis: "Narra la historia de un coronel francés que defiende a sus hombres de un juicio por cobardía durante la Primera Guerra Mundial.",
      runtime: 88,
      countries: ["Estados Unidos"],
      genre: "Historia militar",
      image: "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2017/09/29/15066688252082.jpg",
      war: "1 Guerra Mundial",
      era: "66cb9e6e3e3688ccc74bcc45" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "Los_soldados_de_Salamina",
      year: 2003,
      director: "David Trueba",
      synopsis: "Basada en la novela de Javier Cercas, cuenta la historia de un escritor que investiga la vida de un soldado durante la Guerra Civil Española.",
      runtime: 119,
      countries: ["España"],
      genre: "Historia militar",
      image: "https://fr.web.img2.acsta.net/medias/nmedia/18/82/37/56/19612175.jpg",
      war: "Guerra Civil Española",
      era: "66cb9e6e3e3688ccc74bcc45" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "Mientras_dura_la_guerra",
      year: 2019,
      director: "Alejandro Amenábar",
      synopsis: "La película se centra en los primeros meses de la Guerra Civil Española, enfocándose en el famoso escritor Miguel de Unamuno y su lucha interna al decidir apoyar inicialmente el golpe de estado militar y luego enfrentarse a las atrocidades del régimen franquista.",
      runtime: 107,
      countries: ["España", "Argentina"],
      genre: "Historia militar",
      image: "https://www.panteracine.com/wp-content/uploads/2020/02/alejandro-amenabar.jpg",
      war: "Guerra Civil Española",
      era: "66cb9e6e3e3688ccc74bcc45" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "Salvando_al_Soldado_Ryan",
      year: 1998,
      director: "Steven Spielberg",
      synopsis: "Durante la Segunda Guerra Mundial, un grupo de soldados liderado por el Capitán John Miller es enviado a buscar y traer de regreso al soldado James Ryan, cuyos hermanos han muerto en combate, como un acto simbólico para consolar a su madre.",
      runtime: 169,
      countries: ["Estados Unidos"],
      genre: "Historia militar",
      image: "https://www.lasdaoalplay.com/wp-content/uploads/2018/03/ryan-767x1024.jpg",
      war: "2 Guerra Mundial",
      era: "66cb9e6e3e3688ccc74bcc45" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "Cartas_desde_Iwo_Jima",
      year: 2006,
      director: "Clint Eastwood",
      synopsis: "Contada desde la perspectiva japonesa, la película retrata la batalla de Iwo Jima y la valentía de los soldados japoneses defendiendo la isla contra la invasión estadounidense durante la Segunda Guerra Mundial.",
      runtime: 141,
      countries: ["Estados Unidos", "Japón"],
      genre: "Historia militar",
      image: "https://th.bing.com/th/id/OIP.rnbf2-_CaRhb6okyQnRWZAAAAA?rs=1&pid=ImgDetMain",
      war: "2 Guerra Mundial",
      era: "66cb9e6e3e3688ccc74bcc45" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "Mash",
      year: 1970,
      director: "Robert Altman",
      synopsis: "Ambientada durante la Guerra de Corea, la película sigue las vidas de un grupo de médicos militares en un hospital de campaña, quienes usan el humor negro y el sarcasmo para lidiar con las atrocidades de la guerra.",
      runtime: 116,
      countries: ["Estados Unidos"],
      genre: "Historia militar",
      image: "https://www.imago-images.com/bild/st/94659364/m.jpg",
      war: "Guerra de Corea",
      era: "66cb9e6e3e3688ccc74bcc45" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "Apocalipsis_Now",
      year: 1979,
      director: "Francis Ford Coppola",
      synopsis: "Ambientada en la Guerra de Vietnam, la película sigue al Capitán Willard en su misión de encontrar y asesinar al Coronel Kurtz, un oficial renegado del ejército estadounidense que se ha vuelto loco en la selva camboyana.",
      runtime: 153,
      countries: ["Estados Unidos"],
      genre: "Historia militar",
      image: "https://1.bp.blogspot.com/-WUBKWhcpUQk/Xr3hVkYt5SI/AAAAAAAAED4/dIefLLtTx0cecTrHmJHAU6jt7vRfApbbgCLcBGAsYHQ/s640/Apocalypse%2BNow%2B-%2B1979%2B-%2BFrancis%2BFord%2BCoppola.jpg",
      war: "Guerra de Vietnam",
      era: "66cb9e6e3e3688ccc74bcc45" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "La_chaqueta_metálica",
      year: 1987,
      director: "Stanley Kubrick",
      synopsis: "La película sigue a un grupo de marines estadounidenses durante su entrenamiento básico y en combate en la Guerra de Vietnam, explorando los efectos de la guerra en los soldados y su brutalización.",
      runtime: 116,
      countries: ["Reino Unido", "Estados Unidos"],
      genre: "Historia militar",
      image: "https://4.bp.blogspot.com/-Nm2x7iX2lck/UrFwSyHRLeI/AAAAAAAAVMA/-4Yaz6vHh2A/s1600/1987-la-chaqueta-metalica-stanley-kubrick-esp.jpg",
      war: "Guerra de Vietnam",
      era: "66cb9e6e3e3688ccc74bcc45" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "Iluminados_por_el_fuego",
      year: 2005,
      director: "Tristán Bauer",
      synopsis: "La película está basada en las experiencias reales de soldados argentinos durante la Guerra de las Malvinas, y cómo el conflicto impactó a quienes participaron, mostrando la crudeza de la guerra y sus secuelas.",
      runtime: 100,
      countries: ["Argentina"],
      genre: "Historia militar",
      image: "https://c8.alamy.com/compes/b83y97/iluminados-por-el-fuego-iluminados-por-el-fuego-2005-argentina-espana-poster-affiche-gaston-pauls-director-tristan-bauer-b83y97.jpg",
      war: "Guerra de las Malvinas",
      era: "66cb9e6e3e3688ccc74bcc45" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "Kippur",
      year: 2000,
      director: "Amos Gitai",
      synopsis: "La película se centra en la experiencia de dos soldados israelíes durante la Guerra de Yom Kipur, mostrando los horrores del conflicto y la desorientación de los jóvenes soldados en medio del caos.",
      runtime: 123,
      countries: ["Israel", "Francia"],
      genre: "Historia militar",
      image: "https://medias.unifrance.org/medias/249/1/505/format_page/kippur.jpg",
      war: "Guerra de los 6 días",
      era: "66cb9e6e3e3688ccc74bcc45" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
  {
      name: "En_tierra_hostil",
      year: 2008,
      director: "Kathryn Bigelow",
      synopsis: "Ambientada en la Guerra de Irak, la película sigue a un equipo de desactivación de explosivos mientras enfrentan situaciones de vida o muerte diariamente, explorando la adicción a la adrenalina y el impacto psicológico de la guerra.",
      runtime: 131,
      countries: ["Estados Unidos"],
      genre: "Historia militar",
      image: "https://th.bing.com/th/id/R.f147ee2da7232f2a0f8225371b342789?rik=tsjQKkDJd4E31w&riu=http%3a%2f%2fes.web.img3.acsta.net%2fmedias%2fnmedia%2f18%2f70%2f21%2f62%2f19255600.jpg&ehk=r61DaYppOyO1rwLF5I12KtapzF%2fZe6wQrM5MHeaVJ6U%3d&risl=&pid=ImgRaw&r=0",
      war: "Guerra del Golfo",
      era: "66cb9e6e3e3688ccc74bcc45" // Reemplaza con el ObjectId correcto para la era correspondiente
  },
];


                                   

mongoose.connect(process.env.DB_URL)     //función dea mongoose connect para conectar con bd. La función es asíncrona
  .then( async () => {         
    console.log("se ha conectado a la base de datos");        // test 11)               
    const allFilms = await Film.find();      //*
    if(allFilms.length !==0) {         //si hay datos bórralos (otra función asíncrona)
      console.log("Colección no vacía, procediendo a eliminar...");
      await Film.collection.drop();      //* drop borra la colección
      console.log("Colección eliminada");
    } else {
      console.log("La colección ya estaba vacía");
    }                 
    
  })
  .catch((err)=>{console.log("error al borrar", err);})  //capturar el error por si se rompe (opcional)
  .then(async ()=>{                         //ver nota1
    const filmsDocs = arrayFilms.map((eachFilm) => new Film(eachFilm) );
    console.log("Iniciando inserción de películas...");
    await Film.insertMany(filmsDocs);    //*
    console.log("Películas insertadas correctamente");
  })
  .catch((err)=>{
    console.log("error al insertar las películas", err.message);  //capturar el error por si se rompe (opcional)
    console.error("Detalles del error:", err);
  })
  .finally(() => mongoose.disconnect())          //cuando finalice desconecta de bd mongo db (opcional)



    // (nota 1).then(async ()=>{})    //una vez borrados datos tengo que insertar los nuevos datos en bd con promesas (ir a bd y esperar una respuesta) ( asíncrona). Mongodb necesita documentos. Tener en cuenta que son muchos documentos por tanto tengo que recorrer un array de objetos y convertirlo en un array de documentos (función map). El map recibe una función y tengo que retornar lo que me interesa. Dentro d elos paréntesis del map = (cada personaje). con cada personaje se crea el documento con new + instancia modelo de datos + parámetros = cada personaje. Insert many es una función asíncrona por lo que se pone await

    //script  // "seed": "node src/api/seeds/film.seed.js"