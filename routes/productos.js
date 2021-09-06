const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { existeProductoPorId, existeCategoriaPorId } = require("../helpers/db-validator");

const { esAdminRol } = require('../middlewares/validar-roles');

const { validarCampos, validarJWT } = require('../middlewares')

const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto } = require("../controllers/productos");


router.get('/', obtenerProductos);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un Mongo ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un Mongo ID valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

router.put('/:id',[
    validarJWT,
    check('id', 'No es un Mongo ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('categoria', 'o es un Mongo ID valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], actualizarProducto);

router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'No es un Mongo ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], eliminarProducto);

module.exports = router;