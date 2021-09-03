import React, { useEffect, useState } from 'react'
import { fetchProductsByFilter, getProductsByCount } from '../functions/product'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'
import { Menu, Slider } from 'antd'
import { DollarOutlined } from '@ant-design/icons'

const { SubMenu, ItemGroup } = Menu
const Shop = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)
	const [price, setPrice] = useState([0, 0])
	const [ok, setOk] = useState(false)

	const dispatch = useDispatch()
	let { search } = useSelector((state) => ({ ...state }))
	const { text } = search

	// function for all the filter request
	const fetchProducts = (arg) => {
		fetchProductsByFilter(arg).then((res) => {
			setProducts(res.data)
		})
	}

	//1.load all products by default
	useEffect(() => {
		setLoading(true)
		loadAllProducts()
	}, [])

	const loadAllProducts = () => {
		getProductsByCount(12).then((p) => {
			setProducts(p.data)
			setLoading(false)
		})
	}

	//2.load  products based on user search
	useEffect(() => {
		const delayed = setTimeout(() => {
			fetchProducts({ query: text })
		}, 400)
		return () => clearTimeout(delayed)
	}, [text])

	//3.load products based on price range
	useEffect(() => {
		fetchProducts({ price })
	}, [ok])

	const handleSlider = (value) => {
		dispatch({
			type: 'SERACH_QUERY',
			payload: { text: '' },
		})
		setPrice(value)
		setTimeout(() => {
			setOk(!ok)
		}, 400)
	}

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-3 pt-2'>
					<h4>Search/Filter</h4>
					<hr />

					<Menu defaultOpenKeys={['1', '2']} mode='inline'>
						<SubMenu
							key='1'
							title={
								<span className='h6'>
									<DollarOutlined /> Price
								</span>
							}>
							<div>
								<Slider
									className='ml-4 mr-4'
									tipFormatter={(v) => `$${v}`}
									range
									value={price}
									onChange={handleSlider}
									max='5000'
									min='100'
								/>
							</div>
						</SubMenu>
					</Menu>
				</div>

				<div className='col-md-9 pt-3'>
					{loading ? (
						<h4 className='text-danger'>loading...</h4>
					) : (
						<>
							<h4 className='text-info text-center mt-1'>Products</h4>
							<hr />
						</>
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
