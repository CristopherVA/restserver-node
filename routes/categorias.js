const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const { existeCategoriaPorId } = require('../helpers/db-validator');
const { validarJWT, validarCampos, esAdminRol } = require('../middlewares')

const {
    getCategoria,
    getCategoriaPorId,
    postCategoria,
    putCategoria,
    deleteCategoria,
} = require('../controllers/categorias');


// Obtener todas las categorias - publico 
router.get('/', getCategoria);

// Obtener categoria por ID - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], getCategoriaPorId);


// Crear categoria - privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], postCategoria);

// Actulizar categoria -privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], putCategoria);

// Borrar una categoria  Admin
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
] ,deleteCategoria);

module.exports = router;