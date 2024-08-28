const express = require("express");
const router = express.Router();
const { getfilm, getFilmName, add, deleteFilm, updateFilm, getFilmById } = require("../controllers/film.controllers")

router.get("/getfilm", getfilm);
router.get("/getByName/:name", getFilmName);
router.get("/getById/:id", getFilmById);
router.post("/addFilm", add);
router.delete("/delete/:id", deleteFilm);

//el id lo vamos a enviar a traves de los query
router.put("/updateFilm/:id", updateFilm)


module.exports = router
