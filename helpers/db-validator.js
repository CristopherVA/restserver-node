const  Categoria  = require("../models/categoria");
const  Role  = require("../models/role");
const  Usuario  = require("../models/usuario");
const Producto = require('../models/producto');

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

const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error (`El id ${id} no existe`)
    }
}

const existeProductoPorId = async (id) => {
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error (`El id ${id} no existe`)
    }
}




module.exports = {
    esRolValido,
    esCorreoValido,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}