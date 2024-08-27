const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filmSchema = new Schema({
    name: { type: String, require: true, unique: true},
    year: { type: Number, require: true },
    director: { type: String, require: true },
    synopsis: { type: String, require: true },
    runtime: { type: Number, require: true },
    countries: { type: Array, require: true },
    genre: { type: String, require: true, default: "Historia militar" },
    image: { type: String, require: true },                                  //cloudinary
    war: { type: String, require: true },
    era: { type: Schema.Types.ObjectId, ref: "era", require: true } // Referencia a la era
}, {
    collection: "film",                                             //""nombre colección en mongodb
    timestamps: true // createdAt, updatedAt 
})
//String, number, array, date, boolean, ObjectId
const Film = mongoose.model("film", filmSchema);                    //""nombre colección en mongodb (lo lógico es que la const coincida también con el nombre de la colección)
module.exports = Film;
