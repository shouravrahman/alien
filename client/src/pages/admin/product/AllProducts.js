import React, { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner'
import AdminProductCard from '../../../components/cards/AdminProductCard'
import AdminNav from '../../../components/nav/AdminNav'
<<<<<<< HEAD
import { getProductsByCount, removeProduct } from '../../../functions/product'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
=======
import { getProductsByCount } from '../../../functions/product'
>>>>>>> 75f1e5bdfdbf5b26faae0e8c34afad1d6a7fc596

const AllProducts = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)

<<<<<<< HEAD
	const { user } = useSelector((state) => ({ ...state }))

=======
>>>>>>> 75f1e5bdfdbf5b26faae0e8c34afad1d6a7fc596
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

<<<<<<< HEAD
	const handleRemove = (slug) => {
		// console.log(slug)
		if (window.confirm('Sure to Delete?')) {
			removeProduct(slug, user.token)
				.then((res) => {
					loadAllProducts()
					toast.error(`${res.data.title} is deleted`)
				})
				.catch((err) => {
					if (err.response.status === 400) toast.error(err.response.data)
					console.log(err)
				})
		}
	}

=======
>>>>>>> 75f1e5bdfdbf5b26faae0e8c34afad1d6a7fc596
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
<<<<<<< HEAD
									<AdminProductCard product={product} handleRemove={handleRemove} />
=======
									<AdminProductCard product={product} />
>>>>>>> 75f1e5bdfdbf5b26faae0e8c34afad1d6a7fc596
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
