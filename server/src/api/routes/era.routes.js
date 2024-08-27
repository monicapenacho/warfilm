const express = require("express");
const router = express.Router();
const { getera, getEraName, addEra, deleteEra, updateEra } = require("../controllers/era.controllers")

router.get("/getera", getera);
router.get("/getByName/:name", getEraName);
router.post("/addEra", addEra);
router.delete("/delete/:id", deleteEra);

//el id lo vamos a enviar a traves de los query
router.put("/updateEra", updateEra)


module.exports = router
