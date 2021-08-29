/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import SingleProduct from '../components/cards/SingleProduct'
import { getProduct, productStar } from '../functions/product'
import { useSelector } from 'react-redux'

const Product = ({ match }) => {
	const [product, setProduct] = useState({})
	const [star, setStar] = useState(0)
	const { slug } = match.params
	const user = useSelector((state) => ({ ...state }))

	useEffect(() => {
		loadSingleProduct()
	}, [slug])

	useEffect(() => {
		if (product.ratings && user) {
			let existingRatingObject = product.ratings.find(
				(elm) => elm.postedBy.toString() === user._id.toString()
			)
			existingRatingObject && setStar(existingRatingObject.star) //current users star
		}
	}, [])

	const onStarClick = (newRating, name) => {
		setStar(newRating)
		productStar(name, newRating, user.token).then((res) => {
			loadSingleProduct() //if you want to show the updated rating in real time
		})
	}
	const loadSingleProduct = () =>
		getProduct(slug).then((res) => setProduct(res.data))

	return (
		<div className='container-fluid'>
			<div className='row pt-4'>
				<SingleProduct product={product} onStarClick={onStarClick} star={star} />
			</div>
			<div className='row'>
				<div className='col text-center pt-5 pb-5'>
					<hr />
					related products
					<hr />
				</div>
			</div>
		</div>
	)
}

export default Product
