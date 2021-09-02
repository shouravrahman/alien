import { Card, Tabs } from 'antd'
import React from 'react'
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
const { TabPane } = Tabs

const SingleProduct = ({ product, onStarClick, star }) => {
	const { description, title, images, _id } = product
	// console.log(product)

	const defaultImage =
		'https://images.unsplash.com/photo-1597673030062-0a0f1a801a31?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTR8fGxhcHRvcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'

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
						<>
							<ShoppingCartOutlined className='text-info' />
							<br /> Add to Cart{' '}
						</>,
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
