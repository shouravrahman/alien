const Product = require('../models/product')
const slugify = require('slugify')
const { find } = require('../models/user')

exports.create = async (req, res) => {
	try {
		console.log(req.body)
		req.body.slug = slugify(req.body.title)
		const newProduct = await new Product(req.body).save()
		res.json(newProduct)
	} catch (err) {
		console.log(err)
		// res.status(400).send('create category failed');
		res.status(400).json({
			err: err.message,
		})
	}
}

exports.listAll = async (req, res) => {
	let products = await Product.find({})
		.limit(parseInt(req.params.count))
		.populate('category')
		.populate('subcategory')
		.sort([['createdAt', 'desc']])
		.exec()
	res.json(products)
}

exports.remove = async (req, res) => {
	try {
		const deleted = await Product.findOneAndRemove({
			slug: req.params.slug,
		}).exec()
		res.json(deleted)
	} catch (err) {
		console.log(err)
		return res.status(400).send('Product delete failed')
	}
}

exports.read = async (req, res) => {
	const product = await Product.findOne({ slug: req.params.slug })
		.populate('category')
		.populate('subcategory')
		.exec()
	res.json(product)
}

exports.update = async (req, res) => {
	try {
		// comment out the if block if you don't want to update the slug
		if (req.body.title) {
			req.body.slug = slugify(req.body.title)
		}
		const updated = await Product.findOneAndUpdate(
			{ slug: req.params.slug },
			req.body,
			{ new: true }
		).exec()
		res.json(updated)
	} catch (err) {
		console.log('Product update error ========>', err)
		// return res.status(400).send('Product update failed')
		res.status(400).json({
			err: err.message,
		})
	}
}
