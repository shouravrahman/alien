const mongoose = require('mongoose');
const { Schema } = mongoose;
// const { ObjectId } = mongoose.schema;

const userSchema = new Schema(
	{
		name: String, // String is shorthand for {type: String}
		email: {
			type: String,
			required: true,
			index: true,
		},
		role: {
			type: String,
			default: 'subscriber',
		},
		cart: {
			type: Array,
			default: [],
		},
		address: String,
		// wishlist:[{type:ObjectId,ref:'Product'}]
	},
	{ timestamps: true }
);
module.exports = mongoose.model('User', userSchema);
