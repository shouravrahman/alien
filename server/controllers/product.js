const Product = require('../models/product')
const User = require('../models/user')
const slugify = require('slugify')
// const { find } = require('../models/user')

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
//without pagination

// exports.list = async (req, res) => {
// 	try {
// 		//createdAt/updatedAt,desc/asc,3
// 		const { sort, order, limit } = req.body
// 		const products = await Product.find({})
// 			.populate('category')
// 			.populate('subcategory')
// 			.sort([[sort, order]])
// 			.limit(limit)
// 			.exec()
// 		res.json(products)
// 	} catch (err) {
// 		console.log(err)
// 	}
// }

//with pagination
exports.list = async (req, res) => {
	try {
		//createdAt/updatedAt,desc/asc,3
		const { sort, order, page } = req.body
		const currentPage = page || 1
		const perPage = 3 //how many products to send per page

		const products = await Product.find({})
			.skip((currentPage - 1) * perPage) //math nigga
			.populate('category')
			.populate('subcategory')
			.sort([[sort, order]])
			.limit(perPage)
			.exec()
		res.json(products)
	} catch (err) {
		console.log(err)
	}
}
exports.totalProducts = async (req, res) => {
	let total = await Product.find({}).estimatedDocumentCount().exec()
	res.json(total)
}

exports.productStar = async (req, res) => {
	//fin the product based on the id sent from frontend
	const product = await Product.findById(req.params.productId).exec()
	//find the user
	const user = await User.findOne({ email: req.user.email }).exec()
	//get the rating sent from front end
	const { star } = req.body

	//who is updating?
	//check if currently logged in user have already added rating to this product

	let existingRatingObject = product.ratings.find(
		(elm) => elm.postedBy.toString() === user._id.toString()
	)

	//if user haven't left rating yet then push the new rating
	if (existingRatingObject === undefined) {
		let ratingAdded = await Product.findByIdAndUpdate(
			product._id,
			{
				$push: { ratings: { star, postedBy: user._id } },
			},
			{ new: true }
		).exec()
		res.json(ratingAdded)
	} else {
		//if user already left rating then update the rating
		const ratingUpdated = await Product.updateOne(
			{ ratings: { $elemMatch: existingRatingObject } },
			{ $set: { 'ratings.$.star': star } },
			{ new: true }
		).exec()
		res.json(ratingUpdated)
	}
}
