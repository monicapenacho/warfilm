const express = require("express");
const router = express.Router();
const { getfilm, getFilmName, add, deleteFilm, updateFilm, getFilmById } = require("../controllers/film.controllers")
const { isAuth } = require("../../middleware/auth")  

router.get("/getfilm", getfilm);
router.get("/getByName/:name", getFilmName);
router.get("/getById/:id", getFilmById);
router.post("/addFilm", add);
router.delete("/delete/:id", deleteFilm);

//el id lo vamos a enviar a traves de los query
router.put("/updateFilm/:id", [isAuth], updateFilm)


module.exports = router
