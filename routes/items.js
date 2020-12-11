/**
 * path: api/items
 */

const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getItems } = require('../controllers/items');



const router = Router();



router.get('/', validarJWT, getItems);


module.exports = router;