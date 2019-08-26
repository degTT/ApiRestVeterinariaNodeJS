const mongoose = require('mongoose')
const Pets = mongoose.model('pet',{
    nombre: String,
    tipo: String,
    descripcion: String,
})

module.exports = Pets