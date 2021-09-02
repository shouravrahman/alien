import React, { useState, useEffect } from 'react'
import { getSubcategory } from '../../functions/subcategory'
import ProductCard from '../../components/cards/ProductCard'

const SubcategoryHome = ({ match }) => {
	const [subcategory, setSubcategory] = useState({})
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)

	const { slug } = match.params

	useEffect(() => {
		setLoading(true)
		getSubcategory(slug).then((res) => {
			setSubcategory(res.data.specificSubcategory)
			setProducts(res.data.products)
			// console.log(res.data.products)

			setLoading(false)
		})
	}, [])

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col'>
					{loading ? (
						<h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
							Loading...
						</h4>
					) : (
						<h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
							{products.length} Products in "{subcategory.name}" subcategory
						</h4>
					)}
				</div>
			</div>
			<div className='row'>
				{products.map((p) => (
					<div className='col-md-4' key={p._id}>
						<ProductCard product={p} />
					</div>
				))}
			</div>
		</div>
	)
}

export default SubcategoryHome
