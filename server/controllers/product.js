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

//for listing related proucts
exports.listRelated = async (req, res) => {
	const product = await Product.findById(req.params.productId).exec()
	const related = await Product.find({
		_id: { $ne: product._id },
		category: product.category,
	})
		.limit(3)
		.populate('category')
		.populate('subcategory')
		.exec()
	res.json(related)
}

//search / filters

const handleQuery = async (req, res, query) => {
	const products = await Product.find({ $text: { $search: query } })
		.populate('category', '_id name')
		.populate('subcategory', '_id name')
		.populate('postedBy', '_id name')
		.exec()

	res.json(products)
}
const handlePrice = async (req, res, price) => {
	try {
		let products = await Product.find({
			price: {
				$gte: price[0],
				$lte: price[1],
			},
		})
			.populate('category', '_id name')
			.populate('subcategory', '_id name')
			.populate('postedBy', '_id name')
			.exec()
		res.json(products)
	} catch (err) {
		console.log(error)
	}
}

const handleCategory = async (req, res, category) => {
	try {
		let products = await Product.find({
			category,
		})
			.populate('category', '_id name')
			.populate('subcategory', '_id name')
			.populate('postedBy', '_id name')
			.exec()
		res.json(products)
	} catch (error) {
		console.log(error)
	}
}
// 3.33 floor value 3, 3.33 ceiling value 4
const handleStarRating = (req, res, stars) => {
	Product.aggregate([
		{
			$project: {
				document: '$$ROOT',
				floorAverage: {
					$floor: { $avg: '$ratings.star' },
				},
			},
		},
		{
			$match: { floorAverage: stars },
		},
	])
		.limit(12)
		.exec((err, aggregates) => {
			if (err) console.log('aggregate error', err)
			Product.find({ _id: aggregates })
				.populate('category', '_id name')
				.populate('subcategory', '_id name')
				.populate('postedBy', '_id name')
				.exec((err, products) => {
					if (err) console.log('proudcts aggregate find error', err)
					res.json(products)
				})
		})
}

const handleSubcategories = (req, res, subcategories) => {
	const proudcts = Product.find({ subcategory: subcategories })
		.populate('category', '_id name')
		.populate('subcategory', '_id name')
		.populate('postedBy', '_id name')
		.exec()
	res.json(products)
}

const handleShipping = async (req, res, shipping) => {
	const products = await Product.find({ shipping })
		.populate('category', '_id name')
		.populate('subcategory', '_id name')
		.populate('postedBy', '_id name')
		.exec()
	res.json(products)
}
const handleBrand = async (req, res, brand) => {
	const products = await Product.find({ brand })
		.populate('category', '_id name')
		.populate('subcategory', '_id name')
		.populate('postedBy', '_id name')
		.exec()
	res.json(products)
}
const handleColor = async (req, res, color) => {
	const products = await Product.find({ color })
		.populate('category', '_id name')
		.populate('subcategory', '_id name')
		.populate('postedBy', '_id name')
		.exec()
	res.json(products)
}

exports.searchFilters = async (req, res) => {
	const { query, price, stars, subcategories, shipping, brand, color } = req.body

	if (query) {
		await handleQuery(req, res, query)
	}
	if (price !== undefined) {
		await handlePrice(req, res, price)
	}
	if (category) {
		await handleCategory(req, res, category)
	}
	if (stars) {
		await handleStarRating(req, res, stars)
	}
	if (subcategories) {
		await handleSubcategories(req, res, subcategories)
	}
	if (shipping) {
		await handleShipping(req, res, shipping)
	}
	if (brand) {
		await handleBrand(req, res, brand)
	}
	if (color) {
		await handleColor(req, res, color)
	}
}
