const admin = require('../firebase');
const User = require('../models/user');
exports.authCheck = async (req, res, next) => {
	// console.log(request.header);
	try {
		// console.log(req.headers.authtoken);

		const firebaseUser = await admin
			.auth()
			.verifyIdToken(req.headers.authtoken);
		// console.log(firebaseUser);
		req.user = firebaseUser;
		next();
	} catch (error) {
		// console.log(error);
		res.status(401).json({
			err: 'Invalid or expired token',
		});
	}
};
exports.adminCheck = async (req, res, next) => {
	//first get the user email
	const { email } = req.user;
	//query the db for the email
	const adminUser = await User.findOne({ email }).exec();
	//if the user dont have a admin role send 403 status and error message json  response
	if (adminUser.role !== 'admin') {
		res.status(403).json({
			err: 'admin resource.access denied',
		});
	} else {
		//otherwise execute the next
		next();
	}
};
