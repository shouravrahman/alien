const express = require('express');
const router = express.Router();

//controllers
const { create, read } = require('../controllers/product');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

//routes
router.post('/create', authCheck, adminCheck, create);
router.get('/products', read);

module.exports = router;
