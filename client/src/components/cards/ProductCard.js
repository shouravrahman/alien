import React from 'react'
import { Card } from 'antd'
import { EyeOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Meta } = Card

const ProductCard = ({ product }) => {
	const { title, description, images, slug, price } = product
	const defaultImage =
		'https://images.unsplash.com/photo-1597673030062-0a0f1a801a31?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTR8fGxhcHRvcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'

	return (
		<Card
			hoverable
			actions={[
				<Link to={`/product/${slug}`}>
					<EyeOutlined className='text-warning' />
					<br />
					View Product
				</Link>,
				<>
					<ShoppingOutlined className='text-danger' />
					<br /> Add to Cart{' '}
				</>,
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
