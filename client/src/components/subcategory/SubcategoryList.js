import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSubcategories } from '../../functions/subcategory'

const SubcategoryList = () => {
	const [subcategories, setSubcategories] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		getSubcategories().then((c) => {
			// console.log(c.data)
			setSubcategories(c.data)
			setLoading(false)
		})
	}, [])

	const showSubcategories = () => {
		return subcategories.map((s) => (
			<div
				key={s._id}
				className='col btn btn-outlined-info btn-lg btn-raised m-2 btn-block'>
				<Link to={`/subcategory/${s.slug}`}>{s.name}</Link>
			</div>
		))
	}
	return (
		<div className='container'>
			<div className='row'>
				{loading ? (
					<h4 className='text-center text-dark'>loading subcategories...</h4>
				) : (
					showSubcategories()
				)}
			</div>
		</div>
	)
}

export default SubcategoryList
