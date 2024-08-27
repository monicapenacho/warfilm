const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, require: true },
    surname: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, require: true, enum: ["admin", "client"], default: "client" },
    image: { type: String, default: "" },                                //cloudinary
    film: [{ type: Schema.Types.ObjectId, ref: "film" }],                // relación con film
    era: [{ type: Schema.Types.ObjectId, ref: "era" }]                   // relación con era
},
    {
        collection: "user",
        timestamps: true // createdAt, updatedAt 
    })
const User = mongoose.model("user", userSchema)
module.exports = User;