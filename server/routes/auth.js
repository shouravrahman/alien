const express = require('express');
const router = express.Router();

//controller import
const { createOrUpdateUser } = require('../controllers/auth');

//middlewares
const { authCheck } = require('../middlewares/auth');

router.post('/create-or-update-user', authCheck, createOrUpdateUser);

module.exports = router;
