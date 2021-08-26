import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getSubcategory, updateSubcategory } from '../../../functions/subcategory'
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'
import { getCategories } from '../../../functions/category'
import Loader from 'react-loader-spinner'

const UpdateSubcategory = ({ history, match }) => {
	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	const [categories, setCategories] = useState([])
	const [parent, setParent] = useState('')
	const { user } = useSelector((state) => ({
		...state,
	}))

	const loadCategories = () =>
		getCategories().then((categories) => setCategories(categories.data))

	const loadSubcategory = () =>
		getSubcategory(match.params.slug).then((subcategory) => {
			setName(subcategory.data.name)
			setParent(subcategory.data.parent)
		})

	useEffect(() => {
		loadCategories()
		loadSubcategory()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)
		updateSubcategory(
			match.params.slug,
			{
				name,
				parent,
			},
			user.token
		)
			.then((res) => {
				setLoading(false)
				setName('')
				toast.success(`${res.data.name} subcategory updated`)
				history.push('/admin/subcategory')
			})
			.catch((err) => {
				setLoading(false)
				if (err.response.status === 400) toast.error(err.response.message)
			})
	}

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
						 position-relative'
						/>
					) : (
						<h4> Update Subcategory </h4>
					)}

					<div className='form-group'>
						<label>Parent Category</label>
						<select
							name='category'
							className='form-control'
							onChange={(e) => setParent(e.target.value)}>
							<option>please select</option>
							{categories.length > 0 &&
								categories.map((c) => (
									<option key={c._id} value={c._id} selected={c._id === parent}>
										{c.name}
									</option>
								))}
						</select>
					</div>

					<CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
				</div>
			</div>
		</div>
	)
}

export default UpdateSubcategory
