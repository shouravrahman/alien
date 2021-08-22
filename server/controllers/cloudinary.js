const cloudinary = require('cloudinary');
const { v4: uuidv4 } = require('uuid');
//config
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

//functions

exports.uploadImage = async (req, res) => {
	let result = await cloudinary.uploader.upload(req.body.image, {
		public_id: `${uuidv4()}`,
		resource_type: 'auto', //jpeg,png whatever
	});
	res.json({
		public_id: result.public_id,
		url: result.secure_url,
	});
};

exports.removeImage = async (req, res) => {
	let image_id = req.body.public_id;

	cloudinary.uploader.destroy(image_id, (err, result) => {
		if (err) return res.json({ success: false, err });
		res.send('ok');
	});
};
