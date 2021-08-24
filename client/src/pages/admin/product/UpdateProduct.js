/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getProduct, updateProduct } from '../../../functions/product'
import { getCategories, getSubcategories } from '../../../functions/category'
import AdminNav from '../../../components/nav/AdminNav'
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'
import FileUpload from '../../../components/forms/FileUpload'
import { toast } from 'react-toastify'

const initialState = {
	title: '',
	description: '',
	price: '',
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

const UpdateProduct = ({ match, history }) => {
	const [subcategoryOptions, setSubcategoryOptions] = useState([])
	const [arrayOfSubcategoryIds, setArrayOfSubcategoryIds] = useState([])
	const [categories, setCategories] = useState([])
	const [selectedCategory, setSelectedCategory] = useState('')
	const [values, setValues] = useState(initialState)
	const [loading, setLoading] = useState(false)

	const { user } = useSelector((state) => ({ ...state }))

	useEffect(() => {
		loadProduct()
		loadCategories()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const loadProduct = () => {
		getProduct(slug)
			.then((res) => {
				//load single product
				setValues({ ...values, ...res.data })

				//load subcategories releated to that product
				getSubcategories(res.data.category._id).then((res) => {
					setSubcategoryOptions(res.data)
				})
				//prepare array of subcategory info
				let arr = []
				// eslint-disable-next-line array-callback-return
				res.data.subcategory.map((s) => {
					arr.push(s._id)
				})
				setArrayOfSubcategoryIds((prev) => arr) //required for ant design select component
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const loadCategories = () =>
		getCategories().then((categories) =>
			setCategories({ ...values, categories: categories.data })
		)

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	const handleCategoryChange = (e) => {
		e.preventDefault()
		setValues({ ...values, subcategory: [] })
		setSelectedCategory(e.target.value)
		getSubcategories(e.target.value).then((res) => {
			setSubcategoryOptions(res.data)
		})
		if (values.category._id === e.target.value) {
			loadProduct()
		}
		setArrayOfSubcategoryIds([])
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)

		values.subcategory = arrayOfSubcategoryIds
		values.category = selectedCategory ? selectedCategory : values.category
		updateProduct(slug, values, user.token)
			.then((res) => {
				setLoading(false)
				toast.success(`"${res.data.title}" is updated`)
				history.push('/admin/products')
			})
			.catch((err) => {
				setLoading(false)
				console.log(err)
				toast.error(err.response.data.err)
			})
	}

	//router param
	const { slug } = match.params

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col-md-10'>
					<h4>Update Product</h4>
					<hr />
					<div className='p-3'>
						<FileUpload
							values={values}
							setValues={setValues}
							setLoading={setLoading}
						/>
					</div>
					<ProductUpdateForm
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						values={values}
						setValues={setValues}
						handleCategoryChange={handleCategoryChange}
						subcategoryOptions={subcategoryOptions}
						categories={categories}
						arrayOfSubcategoryIds={arrayOfSubcategoryIds}
						setArrayOfSubcategoryIds={setArrayOfSubcategoryIds}
						selectedCategory={selectedCategory}
					/>
				</div>
			</div>
		</div>
	)
}

export default UpdateProduct
