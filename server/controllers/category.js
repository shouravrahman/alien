//model
const Category = require('../models/category');
//imports
const slugify = require('slugify');
//functions for each type of request

exports.create = async (req, res) => {
	try {
		//to create a category first we need to grab the name from the req body coming from frontend
		const { name } = req.body;
		//then we can create a new category using the name ,Category model and generate a slug on the fly
		const category = await new Category({ name, slug: slugify(name) }).save();
		res.json(category);
	} catch (err) {
		res.status(400).send('create category failed');
	}
};
exports.list = async (req, res) => {};
exports.read = async (req, res) => {};
exports.update = async (req, res) => {};
exports.remove = async (req, res) => {};
