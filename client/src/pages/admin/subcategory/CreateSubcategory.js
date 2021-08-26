import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
	createSubcategory,
	removeSubcategory,
	getSubcategories,
} from '../../../functions/subcategory'
import AdminNav from '../../../components/nav/AdminNav'
import { Link } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import Filter from '../../../components/forms/Filter'
import { getCategories } from '../../../functions/category'
import Loader from 'react-loader-spinner'

const CreateSubcategory = () => {
	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	const [categories, setCategories] = useState([])
	const [subcategories, setSubcategories] = useState([])
	const [category, setCategory] = useState('')
	const [keyword, setKeyword] = useState('') //for search/filter
	const { user } = useSelector((state) => ({
		...state,
	}))

	const loadCategories = () =>
		getCategories().then((categories) => setCategories(categories.data))
	const loadSubcategories = () =>
		getSubcategories().then((subcategories) => setSubcategories(subcategories.data))

	useEffect(() => {
		loadSubcategories()
		loadCategories()
	}, [])

	const handleRemove = (slug) => {
		if (window.confirm('Are you sure you want to delete this category?')) {
			setLoading(true)
			removeSubcategory(slug, user.token)
				.then((res) => {
					setLoading(false)
					toast.error(`${res.data.name} subcategory deleted`)
					loadSubcategories()
				})
				.catch((err) => {
					setLoading(false)
					toast.error(err.response.message)
				})
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)
		createSubcategory(
			{
				name,
				parent: category,
			},
			user.token
		)
			.then((res) => {
				setLoading(false)
				setName('')
				toast.success(`${res.data.name} subcategory created`)
				loadSubcategories()
			})
			.catch((err) => {
				setLoading(false)
				if (err.response.status === 400) toast.error(err.response.data)
			})
	}

	// HOC  baby
	const searched = (keyword) => (category) =>
		category.name.toLowerCase().includes(keyword)

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col-md-10'>
					{loading ? (
						<Loader
							type='Plane'
							color='Blue'
							secondaryColor='Red'
							height={40}
							width={40}
							className='d-flex align-items-center justify-content-center
						 position-relative p-2'
						/>
					) : (
						<h4> Create Subcategory </h4>
					)}

					<div className='form-group'>
						<label>Parent Category</label>
						<select
							name='category'
							className='form-control'
							onChange={(e) => setCategory(e.target.value)}>
							<option>please select</option>
							{categories.length > 0 &&
								categories.map((c) => (
									<option key={c._id} value={c._id}>
										{c.name}
									</option>
								))}
						</select>
					</div>

					<CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

					<Filter keyword={keyword} setKeyword={setKeyword} />

					{subcategories &&
						subcategories.filter(searched(keyword)).map((sub) => (
							<div className='alert alert-secondary' key={sub._id}>
								{sub.name}
								<span
									onClick={() => handleRemove(sub.slug)}
									className='btn btn-sm float-right'>
									<DeleteOutlined className='text-danger' />
								</span>
								<Link to={`/admin/subcategory/${sub.slug}`}>
									<span className='btn btn-sm float-right'>
										<EditOutlined className='text-warning' />
									</span>
								</Link>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default CreateSubcategory
