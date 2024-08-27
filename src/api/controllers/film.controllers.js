const { response } = require("express");
const Film = require("../models/film.model")            //importación modelo de datos

const getfilm = async (req, res) => {                  //función que busca en base de datos
    // aqui es donde se usará el modelo de datos
   try {
    //http://localhost:3500/characters?pag=5&limit=10
        let pag = parseInt(req.query.pag)
        let limit = parseInt(req.query.limit)
        const numFilms = await Film.countDocuments()
        pag = !isNaN(pag) ? pag : 1;
        limit = !isNaN(limit) ? limit : 5; // limite por defecto
        console.log(pag, limit)

        let numPage = Math.ceil(numFilms / limit)

        if (pag > numPage) {
            pag = numPage;
        }
        if (pag < 1) {
            pag = 1
        }

        /*
            pag=1;
            limit = 10
            20--> pagina 2
        +*/
        const listFilms = await Film.find().skip((pag - 1) * limit).limit(limit)
        //skip--> descarto los elementos que no estan en la pagina indicada
        //limit, solo devuelco la cantidad definida en el limit.

        res.json({
            previewPage: pag === 1 ? null : pag - 1,
            nextPage: numPage >= pag + 1 ? pag + 1 : null,
            data: listFilms
        })
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}
//buscar un film por nombre /getByName/:name
const getFilmName = async (req, res) => {
    const { name } = req.params;
    const filmByName = await Film.find({ name: name })

    res.json(filmByName)
}
//buscar un film por id
const getFilmById = async (req, res) => {
    const { id } = req.params
    const filmById = await Film.findById(id);
    res.json(filmById)

}
// añadir un nuevo film
const add = async (req, res) => {
    try {
        const newFilm = req.body;
        const findFilm = await Film.find({ name: newFilm.name })
        if (findFilm.length === 0) {
            // si el film no está en la BD
            const film = new Film(newFilm)
            const createdFilm = await film.save()
            res.status(201).json(createdFilm)
        } else {
            res.status(200).json({ message: "La película está repetida" })
        }
    } catch (error) {

    }
}
//borrar film
const deleteFilm = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteFilm = await Film.findByIdAndDelete(id);
        if (deleteFilm) {
            res.status(201).json({ success: true, message: deleteFilm })
        } else {
            res.status(200).json({ success: false, message: "No existe el id" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateFilm = async (req, res) => {
    try {
        const { id } = req.query;
        const filmBody = req.body;
        const updateFilm = await Film.findByIdAndUpdate(id, filmBody, { new: true })
        //valo
        if (!updateFilm) {
            res.json({ success: false, message: "el id no existe" })
        } else {
            res.json(updateFilm)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}
module.exports = { getfilm, getFilmName, getFilmById, add, deleteFilm, updateFilm };





//getfilm antes de paginación

// const getfilm = async (req, res) => {
//         // aqui es donde se usará el modelo de datos
//        try {
//             const listFilms = await Film.find();
//             res.json(listFilms)
//         } catch (error) {
//             console.log(error)
//         }
//     }
