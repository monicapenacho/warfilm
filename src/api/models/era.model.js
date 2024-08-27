const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eraSchema = new Schema({
    name: { type: String, require: true },
    film: [{ type: Schema.Types.ObjectId, ref: "film" }]        // relación con film
}, {
    collection: "era",
    timestamps: true // createdAt, updatedAt 
})
//String, number, array, date, boolean, ObjectId
const Era = mongoose.model("era", eraSchema)
module.exports = Era;


    // film: [{ type: Schema.Types.ObjectId, ref: "film" }]        // relación con film