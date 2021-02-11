const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ProductSchema = new Schema({
    name: String,
    price: Number,
    category: {
        type: String,
        enum: ['fruit', 'vegetable', 'dairy']
    }
});

module.exports = mongoose.model('Product',ProductSchema);