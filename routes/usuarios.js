const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

//  Middleware
const { 
    validarJWT, 
    validarCampos, 
    esAdminRol, 
    tieneRole 
} = require('../middlewares')

// Controllers
const {
    getUsuarios,
    getUsuariosBorrados,
    postUsuarios,
    putUsuarios,
    deleteUsuarios
} = require('../controllers/usuarios');

// Helpers
const { esCorreoValido, esRolValido, existeUsuarioPorId } = require('../helpers/db-validator');


// =============== GET =================

router.get('/', getUsuarios);

// =============== GET Borrrados =================

router.get('/borrados', getUsuariosBorrados);

// =============== POST =================

router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    // check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(correo => esCorreoValido(correo)),
    check('password', 'El password debe de contener mas de 6 caracteres').isLength({ min: 6 }),
    // check('rol', 'No es un rol valido').isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check('rol').custom(rol => esRolValido(rol)),
    validarCampos
],postUsuarios);

// =============== PUT =================

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(rol => esRolValido(rol)),
    validarCampos
],putUsuarios);

// =============== DELETE =================

router.delete('/:id', [
    validarJWT,
    // esAdminRol,
    tieneRole('ADMIN_ROLE', 'VENTA_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],deleteUsuarios);


module.exports = router;