const { request, response } = require('express');
const Producto = require('../models/producto');


const obtenerProductos = async (req=request, res=response) => {

    const { desde = 0, hasta = 10 } = req.query;

    const [total, producto] = await Promise.all([
        Producto.countDocuments({estado: true}),
        Producto.find()
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .sort(Number(desde))
            .limit(Number(hasta))
    ])

    return res.json({
        total,
        producto
    })
}

const obtenerProducto = async ( req = request, res=response) => {

    const { id } = req.params;

    const buscarProductoId = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')


    return res.json(buscarProductoId);


}

const crearProducto = async (req = request, res= response) => {

    const { estado, usuario, ...data } = req.body;

    const producto = await Producto.findOne({ nombre: data.nombre })
    if(producto){
        return res.status(400).json({
            msg: `El nombre ${ nombre } ya existe en la base de datos`
        })
    }

    const prod = {
        ...data,
        nombre: data.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const crearProducto = new Producto(prod);

    await crearProducto.save();

    return res.json(crearProducto)
}


const actualizarProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...body } = req.body;

    const data = {
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario_id,
        ...body
    }

    const actulizacionProducto = await Producto.findByIdAndUpdate(id, data, { new: true })

    return res.json(actulizacionProducto)
}

const eliminarProducto = async (req=request, res=response) => {

    const { id } = req.params;

    const eliminacionProducto = await  Producto.findByIdAndUpdate(id, { estado:false }, {new: true});


    return res.json(eliminacionProducto);

}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}