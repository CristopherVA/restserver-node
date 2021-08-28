const { response, request } = require("express")


const getUsuarios = (req= request, res = response) => {

    const query = req.query;

    res.json({
        msg: 'API - GET',
        query
    })
}
const postUsuarios = (req = request, res = response) => {

    const { name, desc } = req.body;

    res.json({
        msg: 'API - POST'
    })
}
const putUsuarios = (req = request, res = response) => {

    const { id } = req.params.id;

    res.json({
        msg: 'API - PUT',
        id
    })
}
const deleteUsuarios = (req = request, res = response) => {
    res.json({
        msg: 'API - DELETE'
    })
}

module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios
}