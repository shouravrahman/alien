import React from 'react'
import NewArrivals from '../components/home/NewArrivals'
import BestSellers from '../components/home/BestSellers'
import CategoryList from '../components/category/CategoryList'
import SubcategoryList from '../components/subcategory/SubcategoryList'
const Home = () => {
	return (
		<>
			<div className='jumbotron'>
				{/* slider or something */}
				<h1>Yo</h1>
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
