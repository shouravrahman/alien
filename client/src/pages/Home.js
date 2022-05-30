import React from 'react'
import NewArrivals from '../components/home/NewArrivals'
import BestSellers from '../components/home/BestSellers'
import CategoryList from '../components/category/CategoryList'
import SubcategoryList from '../components/subcategory/SubcategoryList'
import { Carousel } from 'antd'

const contentStyle = {
	height: '400px',
	width: '100%',
	objectFit: 'cover',
}
const Home = () => {
	return (
		<>
			<div className='mb-2'>
				{/* slider or something */}
				<Carousel effect='fade' autoplay>
					<div>
						<img style={contentStyle} src='/static/bundle1.webp' alt='' />
					</div>
					<div>
						<img style={contentStyle} src='/static/bundle2.webp' alt='' />
					</div>
					<div>
						<img style={contentStyle} src='/static/headphone1.webp' alt='' />
					</div>
				</Carousel>
			</div>
			<h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>New Arrivals</h4>
			<NewArrivals />
			<h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>Best Seller</h4>
			<BestSellers />
			<h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>Categories</h4>
			<CategoryList />
			<h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
				Subcategories
			</h4>
			<SubcategoryList />
		</>
	)
}

export default Home
