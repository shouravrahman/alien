const express = require('express');
const router = express.Router();

//controller import
const {
	create,
	read,
	update,
	remove,
	list,
	getSubcategories,
} = require('../controllers/category');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');
//routes
router.post('/category', authCheck, adminCheck, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.put('/category/:slug', authCheck, adminCheck, update);
router.delete('/category/:slug', authCheck, adminCheck, remove);
router.get('/category/subcategories/:_id', getSubcategories);

module.exports = router;
