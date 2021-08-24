const express = require('express')
const router = express.Router()

//controllers
const { create, listAll, remove, read, update } = require('../controllers/product')

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

//routes
router.post('/create', authCheck, adminCheck, create)
router.get('/products/:count', listAll)
router.delete('/product/:slug', authCheck, adminCheck, remove)
router.put('/product/:slug', authCheck, adminCheck, update)
router.get('/product/:slug', read)

module.exports = router
