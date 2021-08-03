const admin = require('../firebase');

exports.authCheck = async (req, res, next) => {
	// console.log(request.header);
	try {
		// console.log(req.headers.authtoken);

		const firebaseUser = await admin
			.auth()
			.verifyIdToken(req.headers.authtoken);
		console.log(firebaseUser);
		req.user = firebaseUser;
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			err: 'Invalid or expired token',
		});
	}
};
