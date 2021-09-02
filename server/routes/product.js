const express = require('express')
const router = express.Router()

//controllers
const {
	create,
	listAll,
	remove,
	read,
	update,
	list,
	totalProducts,
	productStar,
	listRelated,
	searchFilters,
} = require('../controllers/product')

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

//routes
router.post('/create', authCheck, adminCheck, create)
router.get('/products/total', totalProducts)

router.get('/products/:count', listAll)
router.delete('/product/:slug', authCheck, adminCheck, remove)
router.put('/product/:slug', authCheck, adminCheck, update)
router.get('/product/:slug', read)
router.post('/products/list', list) //for fetching products in homepage based on new arrivals and bestseller
router.put('/product/star/:productId', authCheck, productStar) // for star rating update
router.get('/product/related/:productId', listRelated)
//for search
router.post('/search/filters', searchFilters)

module.exports = router
