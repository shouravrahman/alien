const mongoose = require('mongoose');
const { Schema } = mongoose;
// const { ObjectId } = mongoose.schema;
const categorySchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: 'name is required',
			minlength: [2, 'too short'],
			maxlength: [32, 'too long'],
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			index: true,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model('Category', categorySchema);
