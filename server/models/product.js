const mongoose = require('mongoose')
const { Schema } = mongoose
// const ObjectId = Schema.Types.ObjectId;
const { ObjectId } = mongoose.Schema

// const ObjectId = Schema.Types.ObjectId;
// const { ObjectId } = mongoose.Schema.Types.ObjectId;

const productSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32,
			text: true,
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			index: true,
		},
		description: {
			type: String,
			required: true,
			maxlength: 2000,
			text: true,
		},
		price: {
			type: Number,
			trim: true,
			required: true,
			maxlength: 32,
		},
		category: {
			type: ObjectId,
			ref: 'Category',
		},
		subcategory: [
			{
				type: ObjectId,
				ref: 'Subcategory',
			},
		],
		quantity: Number,
		sold: {
			type: Number,
			default: 0,
		},
		images: {
			type: Array,
		},
		shipping: {
			type: String,
			enum: ['Yes', 'No'],
		},
		color: {
			type: String,
			enum: [
				'Black',
				'Brown',
				'Silver',
				'White',
				'Blue',
				'Purple',
				'Grey',
				'Spacegrey',
			],
		},
		brand: {
			type: String,
			enum: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
		},
		ratings: [
			{
				star: Number,
				postedBy: { type: ObjectId, ref: 'User' },
			},
		],
	},
	{ timestamps: true }
)
module.exports = mongoose.model('Product', productSchema)
