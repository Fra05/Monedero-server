const { Schema, model } = require('mongoose');

const ItemsSchema = Schema({
    fecha: {
        type: String,
        required: false
    },
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    precio: {
        type: Number,
        required: true
    },


});

ItemsSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('User', ItemsSchema);