import { Card, Tabs, Tooltip } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import ProductListItems from './ProductListItems'
// import { Tabs } from 'antd'
// import StarRating from 'react-star-ratings'
import RatingModal from '../modal/RatingModal'
// import starRatings from 'react-star-ratings/build/star-ratings'
import StarRatings from 'react-star-ratings'
import { showAverage } from '../../functions/rating'
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'

const { TabPane } = Tabs

const SingleProduct = ({ product, onStarClick, star }) => {
	const [tooltip, setTooltip] = useState('Click to add')
	//redux
	const { user, cart } = useSelector((state) => ({ ...state }))
	const dispatch = useDispatch()
	const { description, title, images, _id } = product
	// console.log(product)

	const defaultImage =
		'https://images.unsplash.com/photo-1597673030062-0a0f1a801a31?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTR8fGxhcHRvcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
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
		}
	}

	return (
		<>
			<div className='col-md-7'>
				{images && images.length ? (
					<Carousel showArrows={true} infiniteLoop autoPlay>
						{images &&
							images.map((i) => <img src={i.url} key={i.public_id} alt={title} />)}
					</Carousel>
				) : (
					<Card
						cover={
							<img src={defaultImage} className='mb-3 card-image' alt={title} />
						}></Card>
				)}
				<Tabs type='card'>
					<TabPane tab='Description' key='1'>
						{description && description}
					</TabPane>
					<TabPane tab='More' key='2'>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, amet?
					</TabPane>
				</Tabs>
			</div>

			<div className='col-md-5'>
				<h1 className='bg-info p-3'>{title}</h1>
				{product && product.ratings && product.ratings.length > 0 ? (
					showAverage(product)
				) : (
					<div className='text-center pt-1 pb-2'>No rating yet</div>
				)}

				<Card
					actions={[
						<Tooltip title={tooltip}>
							{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
							<a onClick={handleAddToCart}>
								<ShoppingCartOutlined className='text-danger' />
								<br /> Add to Cart{' '}
							</a>
						</Tooltip>,
						<Link to={`/`}>
							<HeartOutlined className='text-success' />
							<br />
							Add to Wishlist
						</Link>,
						<RatingModal>
							<StarRatings
								name={_id}
								numberOfStars={5}
								rating={star}
								changeRating={onStarClick}
								isSelectable={true}
								starRatedColor='red'
							/>
						</RatingModal>,
					]}>
					<ProductListItems product={product} />
				</Card>
			</div>
		</>
	)
}

export default SingleProduct
