//model
const Subcategory = require('../models/subcategory');
//imports
const slugify = require('slugify');
//functions for each type of request

exports.create = async (req, res) => {
	try {
		const { name, parent } = req.body;

		const subcategory = await new Subcategory({ name, parent, slug: slugify(name) }).save();
		res.json(subcategory);
	} catch (err) {
		res.status(400).send('create subcategory failed');
	}
};
exports.list = async (req, res) => {
	const list = await Subcategory.find({}).sort({ createdAt: -1 }).exec();
	res.json(list);
};
exports.read = async (req, res) => {
	const specificSubcategory = await Subcategory.findOne({
		slug: req.params.slug,
	}).exec();
	res.json(specificSubcategory);
};
exports.remove = async (req, res) => {
	try {
		const deletedSubcategory = await Subcategory.findOneAndDelete({
			slug: req.params.slug,
		});
		res.json(deletedSubcategory);
	} catch (err) {
		res.status(400).send('delete subcategory failed');
	}
};
exports.update = async (req, res) => {
	const { name, parent } = req.body;

	try {
		const updatedSubcategory = await Subcategory.findOneAndUpdate(
			{ slug: req.params.slug },
			{ name, parent, slug: slugify(name) },
			{ new: true }
		);
		res.json(updatedSubcategory);
	} catch (err) {
		res.status(400).send('update subcategory failed');
	}
};
