/**
 * path: api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { registro, login, renewToken, getUsers } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.post('/new', [
    check('first_name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos
], registro);

router.post('/', [
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail()
], login);

router.get('/renew', validarJWT, renewToken);


module.exports = router;