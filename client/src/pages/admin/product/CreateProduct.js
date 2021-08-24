import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createProduct } from '../../../functions/product'
import { getCategories, getSubcategories } from '../../../functions/category'
import AdminNav from '../../../components/nav/AdminNav'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import FileUpload from '../../../components/forms/FileUpload'

const initialState = {
	title: '',
	description: '',
	price: '',
	categories: [],
	category: '',
	subcategory: [],
	shipping: '',
	quantity: '',
	images: [],
	colors: '',
	brands: '',
	color: '',
	brand: '',
}

const CreateProduct = () => {
	const [values, setValues] = useState(initialState)
	const [subcategoryOptions, setSubcategoryOptions] = useState([])
	const [showSubcategories, setShowSubcategories] = useState(false)
	// eslint-disable-next-line no-unused-vars
	const [loading, setLoading] = useState(false)
	const { user } = useSelector((state) => ({ ...state }))

	const loadCategories = () =>
		getCategories().then((categories) =>
			setValues({ ...values, categories: categories.data })
		)

	useEffect(() => {
		loadCategories()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		createProduct(values, user.token)
			.then((res) => {
				window.alert(`"${res.data.title} is created`)
				window.location.reload()
			})
			.catch((err) => {
				// if (err.response.status === 400) toast.error(err.response.data);
				toast.error(err.response.data.err)
			})
	}

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}
	const handleCategoryChange = (e) => {
		e.preventDefault()
		setValues({ ...values, subcategory: [], category: e.target.value })
		getSubcategories(e.target.value).then((res) => {
			setSubcategoryOptions(res.data)
		})
		setShowSubcategories(true)
	}

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col-md-10'>
					<h4>Create Product</h4>
					<div className='p-3'>
						<FileUpload
							values={values}
							setValues={setValues}
							setLoading={setLoading}
						/>
					</div>
					<ProductCreateForm
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						values={values}
						handleCategoryChange={handleCategoryChange}
						showSubcategories={showSubcategories}
						subcategoryOptions={subcategoryOptions}
						setValues={setValues}
					/>
				</div>
			</div>
		</div>
	)
}

export default CreateProduct
