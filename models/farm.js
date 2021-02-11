const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const farmSchema = new Schema({
    name: String,
    city: String,
    email: String
});

module.exports = mongoose.model('Farms', farmSchema);