import React from 'react'
import { Select } from 'antd'
const { Option } = Select
const ProductCreateForm = ({
	handleChange,
	handleSubmit,
	values,
	handleCategoryChange,
	showSubcategories,
	subcategoryOptions,
	setValues,
}) => {
	//destructure
	const {
		title,
		description,
		price,
		categories,
		// category,
		subcategory,
		// shipping,
		quantity,
		// images,
		color,
		brand,
	} = values
	return (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label>Title</label>
				<input
					type='text'
					name='title'
					className='form-control mb-2'
					value={title}
					onChange={handleChange}
					required
				/>
			</div>

			<div className='form-group'>
				<label>Description</label>
				<input
					type='text'
					name='description'
					className='form-control'
					value={description}
					onChange={handleChange}
					required
				/>
			</div>

			<div className='form-group'>
				<label>Price</label>
				<input
					type='number'
					name='price'
					className='form-control'
					value={price}
					onChange={handleChange}
					required
				/>
			</div>

			<div className='form-group'>
				<label>Shipping</label>
				<select
					name='shipping'
					required
					className='form-control'
					onChange={handleChange}>
					<option>Please select</option>
					<option value='Yes'>Yes</option>
					<option value='No'>No</option>
				</select>
			</div>

			<div className='form-group'>
				<label>Quantity</label>
				<input
					type='number'
					name='quantity'
					className='form-control'
					value={quantity}
					onChange={handleChange}
					required
				/>
			</div>

			<div className='form-group'>
				<label>Color</label>
				<input
					type='text'
					name='color'
					className='form-control'
					value={color}
					onChange={handleChange}
				/>
			</div>

			<div className='form-group'>
				<label>Brand</label>
				<input
					type='text'
					name='brand'
					className='form-control'
					value={brand}
					onChange={handleChange}
				/>
			</div>
			<div className='form-group'>
				<label>Category</label>
				<select
					required
					name='category'
					className='form-control'
					onChange={handleCategoryChange}>
					<option>please select</option>
					{categories.length > 0 &&
						categories.map((c) => (
							<option key={c._id} value={c._id}>
								{c.name}
							</option>
						))}
				</select>
			</div>

			{showSubcategories && (
				<div>
					<label>Subcategories</label>
					<Select
						mode='multiple'
						style={{ width: '100%' }}
						placeholder='please select'
						value={subcategory}
						name='subcategory'
						onChange={(value) => setValues({ ...values, subcategory: value })}>
						{subcategoryOptions.length &&
							subcategoryOptions.map((s) => (
								<Option key={s._id} value={s._id}>
									{s.name}
								</Option>
							))}
					</Select>
				</div>
			)}
			<button className='mt-2 btn btn-outline-info'>Save</button>
		</form>
	)
}

export default ProductCreateForm
