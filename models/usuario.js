const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio'],
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emund: ['ADMIN_ROLE', 'USER_ROLE' ]
    },  
    estado:{
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})


// Funcions para sacar los valores de la respuesta del json en postman

UsuarioSchema.methods.toJSON = function () {
    const { __v, passowrd, ...usuario } = this.toObject();
    return usuario
}

module.exports = model('Usuario', UsuarioSchema)