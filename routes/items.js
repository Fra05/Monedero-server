/**
 * path: api/items
 */

const { Router } = require('express');


const { getItems } = require('../controllers/items');



const router = Router();



router.get('/', getItems);


module.exports = router;