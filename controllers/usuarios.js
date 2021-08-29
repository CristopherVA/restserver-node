const { response, request } = require("express")
const bcryptjs = require("bcryptjs");

const Usuario = require('../models/usuario');
const usuario = require("../models/usuario");


//===================== GET ==========================

const getUsuarios = async (req= request, res = response) => {

    const { desde = 0, limite = 15 } = req.query;
    const query = {estado: true}

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    ])

    res.json({
        total,
        usuarios
    })
}

//===================== GET BORRADOS ==========================

const getUsuariosBorrados = async (req= request, res = response) => {

    const { desde = 0, limite = 15 } = req.query;
    const query = {estado: false}

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    ])

    res.json({
        total,
        usuarios
    })
}

//===================== POST ==========================

const postUsuarios = async (req = request, res = response) => {

    const { nombre, correo, password, rol} = req.body;

    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });  

    // Encriptar contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guarsar db
    await usuario.save();

    res.json(usuario)
}


//===================== PUT ==========================

const putUsuarios = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, ...resto} = req.body;

    if(password) {
        // encriptar password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario)
}

//===================== PUT ==========================


//===================== DELETE ==========================

const deleteUsuarios = async (req = request, res = response) => {

    const { id } = req.params;  

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.json({
        usuario
    })
}

module.exports = {
    getUsuarios,
    getUsuariosBorrados,
    postUsuarios,
    putUsuarios,
    deleteUsuarios
}