const bcryptjs = require("bcryptjs");
const { response } = require("express");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");


const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correcto - correo'
            })
        }

        // Verifica si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correcto - estado: false'
            })
        }

        // Verificar la password
        const verificarPassword = bcryptjs.compareSync(password, usuario.password)
        if(!verificarPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correcto - password'
            })
        }

        // Generar JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        throw new Error ('Cominiquese con el administrador')
    }
}

module.exports = {
    login
}