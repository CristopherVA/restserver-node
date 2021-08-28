const { Router } = require('express');
const router = Router();

const {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios
} = require('../controllers/usuarios');

router.get('/', getUsuarios);
router.post('/', postUsuarios);
router.put('/:id', putUsuarios);
router.delete('/', deleteUsuarios);

module.exports = router;