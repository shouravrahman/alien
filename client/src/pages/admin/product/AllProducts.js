import React, { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner'
import AdminProductCard from '../../../components/cards/AdminProductCard'
import AdminNav from '../../../components/nav/AdminNav'
import { getProductsByCount } from '../../../functions/product'

const AllProducts = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		loadAllProducts()
	}, [])

	const loadAllProducts = () => {
		setLoading(true)

		getProductsByCount(100).then((res) => {
			setProducts(res.data)
			setLoading(false)
		})
		setLoading(false).catch((err) => {
			console.log(err)
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
						<div className='row'>
							{products.map((product) => (
								<div key={product._id} className='col-md-4 pb-3'>
									<AdminProductCard product={product} />
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default AllProducts
