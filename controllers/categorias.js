const { response, request } = require("express");

const Categoria = require('../models/categoria')



// Obtener categorias - paginado - populate
const getCategoria = async (req=request, res=response) => {

    const { desde = 0, hasta = 10 } = req.query;

    const [total, categoria] = await Promise.all([
        Categoria.countDocuments({estado: true}),
        Categoria.find()
            .populate('usuario', 'nombre')
            .sort(Number(desde))
            .limit(Number(hasta))
    ])

    return res.json({ total, categoria })
}

// Obtener categoria - poputate
const getCategoriaPorId = async (req = request, res=response) => {

    const { id } = req.params;

    const buscarCategoria = await Categoria.findById(id).populate('usuario').populate('usuario', 'nombre');

    return res.json({
        buscarCategoria
    })
}

// Crear Categoria
const postCategoria = async (req, res=response) => {

    const nombre = req.body.nombre.toUpperCase();

    const buscarCategoria = await Categoria.findOne({ nombre })

    if(buscarCategoria){
        return res.status(400).json({
            msg: `La categoria ${ nombre } ya existe en la base de datos`
        })
    }

    const data ={
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)

    await categoria.save()


    return res.json(categoria);
}

// Actualizar Categoria
const putCategoria = async (req = request, res=response) => {

    const { id } = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const actulizarCategoria = await Categoria.findByIdAndUpdate(id, data, { new: true })

    return res.json({
        actulizarCategoria
    })
}

// Elimianra Categoria
const deleteCategoria = async (req = request, res=response) => {

    const { id } = req.params;

    const eliminarCategoria = await Categoria.findByIdAndUpdate(id, {estado: false}, { new: true})
        .populate('usuario', 'nombre')



    return res.json({
        eliminarCategoria
    })
}

module.exports = {
    getCategoria,
    getCategoriaPorId,
    postCategoria,
    putCategoria,
    deleteCategoria
}
