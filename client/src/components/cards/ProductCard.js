import { EyeOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Card, Tooltip } from 'antd'
import _ from 'lodash'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const { Meta } = Card

const ProductCard = ({ product }) => {
	const { title, description, images, slug, price } = product
	const defaultImage =
		'https://images.unsplash.com/photo-1597673030062-0a0f1a801a31?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTR8fGxhcHRvcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'

	const [tooltip, setTooltip] = useState('Click to add')
	//redux
	const { user, cart } = useSelector((state) => ({ ...state }))
	const dispatch = useDispatch()
	const handleAddToCart = () => {
		//create cart array
		let cart = []

		if (typeof window !== 'undefined') {
			//if cart is in localstorage then get it
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'))
			}
			//push new cart to local storage
			cart.push({
				...product,
				count: 1,
			})
			//remove duplicates
			//lodash
			let unique = _.uniqWith(cart, _.isEqual)
			//save to localstorage
			localStorage.setItem('cart', JSON.stringify(unique))
			//show tooltip
			setTooltip('Added')

			//add to redux state
			dispatch({
				type: 'ADD_TO_CART',
				payload: unique,
			})
			//side drawer
			dispatch({
				type: 'SET_VISIBLE',
				payload: true,
			})
		}
	}

	return (
		<Card
			hoverable
			actions={[
				<Link to={`/product/${slug}`}>
					<EyeOutlined className='text-warning' />
					<br />
					View Product
				</Link>,
				<Tooltip title={tooltip}>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a onClick={handleAddToCart}>
						<ShoppingOutlined className='text-danger' />
						<br /> Add to Cart{' '}
					</a>
				</Tooltip>,
			]}
			cover={
				<img
					src={images && images.length ? images[0].url : defaultImage}
					style={{ height: '150px', objectFit: 'cover' }}
					className='p-2'
					alt={title}
				/>
			}>
			<Meta
				title={`${title} - $${price}`}
				description={`${description && description.substring(0, 40)}...`}
			/>
		</Card>
	)
}

export default ProductCard
