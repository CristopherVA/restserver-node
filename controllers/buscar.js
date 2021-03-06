const { request, response } = require("express");
const { ObjectId } = require('mongoose').Types;
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'role'
];

const buscarUsuario = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);
    
    if ( esMongoId ) {
        const usuario = await Usuario.findById(termino);
        res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    })

    res.json(usuarios)
}

const buscarCategoria = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);
    
    if ( esMongoId ) {
        const categoria = await Categoria.findById(termino);
        res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const categoria = await Categoria.find({nombre: regex, estado: true})

    res.json(categoria)
}

const buscarProducto = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);
    
    if ( esMongoId ) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre')
        res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const producto = await Producto.find({nombre: regex, estado: true})
                            .populate('categoria', 'nombre')


    res.json(producto)
}


const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(500).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
                buscarUsuario(termino, res);
            break;
        case 'categorias':
                buscarCategoria(termino, res)
            break;
        case 'productos':
                buscarProducto(termino, res)
            break;
    
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
            break;
    }

}

module.exports = {
    buscar
}