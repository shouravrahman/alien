const express = require('express');
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

//controllers
const { uploadImage, removeImage } = require('../controllers/cloudinary');

//routes
router.post('/uploadimages', authCheck, adminCheck, uploadImage);
router.post('/removeimage', authCheck, adminCheck, removeImage);

module.exports = router;
