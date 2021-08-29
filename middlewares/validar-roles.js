const { response } = require("express");


const esAdminRol = ( req, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token'
        })
    }

    // Verificar si es administrador
    const { rol, nombre} = req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${ nombre } no es un administrador - No tines autorizacion de eliminar`
        })
    }

    next();
}

const tieneRole = (...role) => {
    return ( req, res, next ) => {
        
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token'
            })
        }
        
        if(!role.includes(req.usuario.rol)){
            return res.status(500).json({
                msg: `El servicio requiere de uno de esto roles ${ role }`
            })
        }

        next();
    }

   
}

module.exports = {
    esAdminRol,
    tieneRole
}