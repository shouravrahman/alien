import React from 'react'
import NewArrivals from '../components/home/NewArrivals'
import BestSellers from '../components/home/BestSellers'
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
		</>
	)
}

export default Home
