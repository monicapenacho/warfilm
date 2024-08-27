const { response } = require("express");
const Era = require("../models/era.model")

const getera = async (req, res) => {
    // aqui es donde se usará el modelo de datos
    try {
        const listEras = await Era.find();
        res.json(listEras)
    } catch (error) {
        console.log(error)
    }
}
//buscar un era por nombre /getByName/:name
const getEraName = async (req, res) => {
    const { name } = req.params;
    const eraByName = await Era.find({ name: name })

    res.json(eraByName)
}
// añadir un nuevo era
const addEra = async (req, res) => {
    try {
        const newEra = req.body;
        const findEra = await Era.find({ name: newEra.name })
        if (findEra.length === 0) {
            // si el era no está en la BD
            const era = new Era(newEra)
            const createdEra = await era.save()
            res.status(201).json(createdEra)
        } else {
            res.status(200).json({ message: "La época está repetida" })
        }
    } catch (error) {

    }
}

const deleteEra = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteEra = await Era.findByIdAndDelete(id);
        if (deleteEra) {
            res.status(201).json({ success: true, message: deleteEra })
        } else {
            res.status(200).json({ success: false, message: "No existe el id" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateEra = async (req, res) => {
    try {
        const { id } = req.query;
        const eraBody = req.body;
        const updateEra = await Era.findByIdAndUpdate(id, eraBody, { new: true })
        //valo
        if (!updateEra) {
            res.json({ success: false, message: "el id no existe" })
        } else {
            res.json(updateEra)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}
module.exports = { getera, getEraName, addEra, deleteEra, updateEra };
