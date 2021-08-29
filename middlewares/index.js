const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRol, tieneRole } = require('../middlewares/validar-roles');

module.exports = {
    validarJWT,
    validarCampos,
    esAdminRol,
    tieneRole
}