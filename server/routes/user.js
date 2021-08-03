const express = require('express');

const router = express.Router();

router.get('/user', (req, res) => {
	res.json({
		data: 'hello motherfucker you just hit the user route',
	});
});

module.exports = router;
