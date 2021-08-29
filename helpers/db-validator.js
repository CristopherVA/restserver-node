const { check } = require("express-validator")
const Role = require("../models/role")
const Usuario = require("../models/usuario")

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol) {
        throw new Error (`El rol ${ rol } no esta registrado en la DB `)
    }
}

const esCorreoValido = async(correo) => {
    const existeCorreo = await Usuario.findOne({correo})
    if(existeCorreo){
        throw  new Error (`El correo ${correo} ya esta registrado en al base de datos`)
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error (`El id ${ id } no existe`)
    }
}

module.exports = {
    esRolValido,
    esCorreoValido,
    existeUsuarioPorId
}