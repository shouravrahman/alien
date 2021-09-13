/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { fetchProductsByFilter, getProductsByCount } from '../functions/product'
import { getCategories } from '../functions/category'
import { getSubcategories } from '../functions/subcategory'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'
import Star from '../components/forms/Star'
import { Menu, Slider, Checkbox, Radio } from 'antd'
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons'

const { SubMenu, ItemGroup } = Menu
const Shop = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)
	const [price, setPrice] = useState([0, 0])
	const [categories, setCategories] = useState([])
	const [subcategories, setSubcategories] = useState([])
	//TODO => dont use hardcoded values for brands or colors
	const [brands, setBrands] = useState(['Apple', 'HP', 'Microsoft', 'Lenovo'])
	const [colors, setColors] = useState([
		'Black',
		'White',
		'Golden',
		'Space-gray',
		'Silver',
	])
	//TODO => dont use hardcoded values for brands or colors

	const [subcategory, setSubcategory] = useState('')
	const [categoryIds, setCategoryIds] = useState([])
	const [star, setStar] = useState('')
	const [brand, setBrand] = useState('')
	const [color, setColor] = useState('')

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
		getCategories().then((res) => setCategories(res.data))
		getSubcategories().then((res) => setSubcategories(res.data))
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
			type: 'SEARCH_QUERY',
			payload: { text: '' },
		})
		setCategoryIds([])
		setStar('')
		setSubcategories('')
		setBrand('')
		setColor('')

		setPrice(value)
		setTimeout(() => {
			setOk(!ok)
		}, 400)
	}
	//4.load products based on categories
	//show all categories in a checkbox
	const showCategories = () => {
		categories.map((c) => (
			<div key={c._id}>
				<Checkbox
					onChange={handleCheck}
					className='pb-2 pl-4 pr-4'
					value={c._id}
					checked={categoryIds.includes(c._id)}
					name='category'>
					{c.name}
				</Checkbox>
				<br />
			</div>
		))
	}
	const handleCheck = (e) => {
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: '' },
		})
		setPrice([0, 0])
		setStar('')
		setSubcategories('')
		setBrand('')
		setColor('')

		let inTheState = [...categoryIds]
		let justChecked = e.target.value
		let foundInTheState = inTheState.indexOf(justChecked)

		if (foundInTheState === -1) {
			inTheState.push(justChecked)
		} else {
			inTheState.splice(foundInTheState, 1)
		}

		setCategoryIds(inTheState)

		fetchProducts({ category: inTheState })
	}
	//5.find products based on star rating
	const handleStarClick = (num) => {
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: '' },
		})
		setPrice([0, 0])
		setCategoryIds([])
		setSubcategories('')
		setBrand('')
		setColor('')

		setStar(num)
		fetchProducts({ stars: num })
	}
	const showStars = () => {
		return (
			<div className='pr-4 pl-4 pb-2'>
				<Star starClick={handleStarClick} numberOfStars={5} />
				<Star starClick={handleStarClick} numberOfStars={4} />
				<Star starClick={handleStarClick} numberOfStars={3} />
				<Star starClick={handleStarClick} numberOfStars={2} />
				<Star starClick={handleStarClick} numberOfStars={1} />
			</div>
		)
	}
	//6.show products based on subcategories

	const showSubcategories = () =>
		subcategories.map((s) => (
			<div
				key={s._id}
				style={{ cursor: 'pointer' }}
				className='p-1 m-1 badge badge-secondary'
				onClick={() => handleSubcategories(s)}>
				{s.name}
			</div>
		))

	const handleSubcategories = (s) => {
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: '' },
		})
		setPrice([0, 0])
		setCategoryIds([])
		setStar('')
		setBrand('')
		setColor('')

		fetchProducts({ subcategory })
	}

	//7.show products based on brands
	const showBrands = () =>
		brands.map((b) => (
			<Radio
				value={b}
				name={b}
				checked={b === brand}
				onChange={handleBrand}
				className='pb-1 pl-4 pr-4'>
				{b}
			</Radio>
		))

	const handleBrand = (e) => {
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: '' },
		})
		setPrice([0, 0])
		setCategoryIds([])
		setStar('')
		setSubcategories('')
		setColor('')

		setBrand(e.target.value)
		fetchProducts({ brand: e.target.value })
	}

	//8.show products based on colors
	const showColors = () =>
		colors.map((c) => (
			<Radio
				value={c}
				name={c}
				checked={c === color}
				onChange={handleColor}
				className='pb-1 pl-4 pr-4'>
				{c}
			</Radio>
		))

	const handleColor = (e) => {
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: '' },
		})
		setPrice([0, 0])
		setCategoryIds([])
		setStar('')
		setSubcategories('')
		setBrand('')

		setColor(e.target.value)
		fetchProducts({ color: e.target.value })
	}
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-3 pt-2'>
					<h4>Search/Filter</h4>
					<hr />

					<Menu defaultOpenKeys={['1', '2', '3', '4', '5']} mode='inline'>
						{/* for price */}
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
						{/* for categories */}
						<SubMenu
							key='2'
							title={
								<span className='h6'>
									<DownSquareOutlined /> Categories
								</span>
							}>
							<div style={{ marginTop: '-10px' }}>{showCategories()}</div>
						</SubMenu>
						{/* for rating*/}
						<SubMenu
							key='3'
							title={
								<span className='h6'>
									<StarOutlined /> Rating
								</span>
							}>
							<div style={{ marginTop: '-10px' }}>{showStars()}</div>
						</SubMenu>
						{/* for subcategories */}
						<SubMenu
							key='4'
							title={
								<span className='h6'>
									<DownSquareOutlined /> Subcategories
								</span>
							}>
							<div style={{ marginTop: '-10px' }}>{showSubcategories()}</div>
						</SubMenu>
						<SubMenu
							key='5'
							title={
								<span className='h6'>
									<DownSquareOutlined /> Brands
								</span>
							}>
							<div style={{ marginTop: '-10px' }} className='pr-5'>
								{showBrands()}
							</div>
						</SubMenu>
						<SubMenu
							key='6'
							title={
								<span className='h6'>
									<DownSquareOutlined /> Colors
								</span>
							}>
							<div style={{ marginTop: '-10px' }} className='pr-5'>
								{showColors()}
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
