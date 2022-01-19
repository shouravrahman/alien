const express = require('express')
const router = express.Router()

//controllers
const { create, list, remove } = require('../controllers/coupon')

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

//routes
router.post('/coupon', authCheck, adminCheck, create)
router.get('/coupons', list)
router.delete('/coupon/:couponId', authCheck, adminCheck, remove)

module.exports = router
