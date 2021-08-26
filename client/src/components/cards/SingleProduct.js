import { Card, Tabs } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import ProductListItems from './ProductListItems'
// import { Tabs } from 'antd'

const { TabPane } = Tabs

const SingleProduct = ({ product }) => {
	const { description, title, images } = product

	const defaultImage =
		'https://images.unsplash.com/photo-1597673030062-0a0f1a801a31?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTR8fGxhcHRvcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'

	return (
		<>
			<div className='col-md-7'>
				{images && images.length ? (
					<Carousel showArrows infiniteLoop autoPlay showIndicators></Carousel>
				) : (
					<Card
						cover={
							<img
								src={images && images.length ? images[0].url : defaultImage}
								className='mb-3 card-image'
								alt={title}
							/>
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
					]}></Card>
				<ProductListItems product={product} />
			</div>
		</>
	)
}

export default SingleProduct
