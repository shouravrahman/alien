import React, { useEffect, useState } from 'react'
import { fetchProductsByFilter, getProductsByCount } from '../functions/product'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'

const Shop = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)

	let { search } = useSelector((state) => ({ ...state }))
	const { text } = search

	useEffect(() => {
		setLoading(true)
		loadAllProducts()
	}, [])

	useEffect(() => {
		const delayed = setTimeout(() => {
			fetchProducts({ query: text })
		}, 400)
		return () => clearTimeout(delayed)
	}, [text])

	const fetchProducts = (arg) => {
		fetchProductsByFilter(arg).then((res) => {
			setProducts(res.data)
		})
	}
	const loadAllProducts = () => {
		getProductsByCount(12).then((p) => {
			setProducts(p.data)
			setLoading(false)
		})
	}

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-3'>Search / filter menu</div>
				<div className='col-md-9'>
					{loading ? (
						<h4 className='text-danger'>loading...</h4>
					) : (
						<h4 className='text-info text-center mt-1'>Products</h4>
					)}
					{products.length < 1 && <p className='text-info'>No Products Found</p>}

					<div className='row pb-5'>
						{products.map((p) => (
							<div className='col-md-4 mt-3' key={p._id}>
								<ProductCard product={p} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Shop
