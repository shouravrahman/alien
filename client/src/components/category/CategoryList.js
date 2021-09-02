import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../../functions/category'

const CategoryList = () => {
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		getCategories().then((c) => {
			setCategories(c.data)
			setLoading(false)
			// console.log(c.data)
		})
	}, [])
	// console.log(categories.data)
	const showCategories = () => {
		return categories.map((c) => (
			<div
				key={c._id}
				className='text-primary col btn btn-outlined-primary btn-lg btn-raised m-2 btn-block'>
				<Link to={`/category/${c.slug}`}>{c.name}</Link>
				{/* <h1>{c.name}</h1> */}
			</div>
		))
	}
	return (
		<div className='container'>
			<div className='row'>
				{loading ? (
					<h4 className='text-center text-dark'>loading categories...</h4>
				) : (
					showCategories()
				)}
			</div>
		</div>
	)
}

export default CategoryList
