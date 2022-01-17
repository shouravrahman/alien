//model
const Category = require('../models/category')
const Subcategory = require('../models/subcategory')
const Product = require('../models/product')
//imports
const slugify = require('slugify')
//functions for each type of request

exports.create = async (req, res) => {
	try {
		//to create a category first we need to grab the name from the req body coming from frontend
		//req.body gives us the entire data that we are sending from the front end
		const { name } = req.body
		//then we can create a new category using the name ,Category model and generate a slug on the fly
		const category = await new Category({ name, slug: slugify(name) }).save()
		res.json(category)
	} catch (err) {
		res.status(400).send('create category failed')
	}
}
exports.list = async (req, res) => {
	//using empty object because we are sending the whole list not a specific one
	//sort method sorts the list and {createdAt : -1} sorts the list from new to old
	//finally execute the code calling exec
	const list = await Category.find({}).sort({ createdAt: -1 }).exec()
	res.json(list)
}
exports.read = async (req, res) => {
	const specificCategory = await Category.findOne({
		slug: req.params.slug,
	}).exec()
	const products = await Product.find({ category: specificCategory })
		.populate('category')
		.exec()

	res.json({
		specificCategory,
		products,
	})
}
exports.remove = async (req, res) => {
	try {
		const deletedCategory = await Category.findOneAndDelete({
			slug: req.params.slug,
		})
		res.json(deletedCategory)
	} catch (err) {
		res.status(400).send('delete category failed')
	}
}
exports.update = async (req, res) => {
	//get the updated name from the frontend
	//find the category using slug
	//in second argument send the new name and thus generate a new slug for the name
	//third argument ensures the reponse contains updated data not the old ones
	const { name } = req.body

	try {
		const updated = await Category.findOneAndUpdate(
			{ slug: req.params.slug },
			{ name, slug: slugify(name) },
			{ new: true }
		)
		res.json(updated)
	} catch (err) {
		res.status(400).send('update category failed')
	}
}

exports.getSubcategories = (req, res) => {
	Subcategory.find({ parent: req.params._id }).exec((err, subcategories) => {
		if (err) console.log(err)
		res.json(subcategories)
	})
}
