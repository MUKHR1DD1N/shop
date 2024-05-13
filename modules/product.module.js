const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    measure: {
        type: String,
        required: true
    },
    massa: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
})

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product