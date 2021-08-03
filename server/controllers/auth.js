const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
	const { name, email, picture } = req.user;

	const user = await User.findOneAndUpdate(
		{
			email,
		},
		{ name: email.split('@')[0], picture },
		{ new: true }
	);

	if (user) {
		console.log('user updated', user);
		res.json(user);
	} else {
		const newUser = await new User({
			email,
			name: email.split('@')[0],
			picture,
		}).save();
		console.log('user created', newUser);
		res.json(newUser);
	}
};
