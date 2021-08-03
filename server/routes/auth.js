const express = require('express');
const router = express.Router();

//controller import
const { createOrUpdateUser, currentUser } = require('../controllers/auth');

//middlewares
const { authCheck } = require('../middlewares/auth');

router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);

module.exports = router;