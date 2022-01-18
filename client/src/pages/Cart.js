import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout'
import { userCart } from '../functions/user'

const Cart = ({ history }) => {
	//redux state
	const { cart, user } = useSelector((state) => ({ ...state }))
	const dispatch = useDispatch()

	//get total price of all items
	const getTotal = () => {
		return cart.reduce((current, next) => {
			return current + next.count * next.price
		}, 0)
	}
	//save order to db if user clicks checkout because of security concern.localstorage can be manipulated by the client
	const saveOrderToDb = () => {
		//
		userCart(cart, user.token)
			.then((res) => {
				console.log(res)
				if (res.data.ok) history.push('/checkout')
			})
			.catch((err) => console.log(err))
	}

	//show cart items
	const showCartItems = () => {
		return (
			<table className='table table-bordered'>
				<thead className='thead-light'>
					<tr>
						<th scope='col'>Image</th>
						<th scope='col'>Title</th>
						<th scope='col'>Price</th>
						<th scope='col'>Brand</th>
						<th scope='col'>Color</th>
						<th scope='col'>Count</th>
						<th scope='col'>Shipping</th>
						<th scope='col'>Remove</th>
					</tr>
				</thead>

				{cart.map((p) => (
					<ProductCardInCheckout key={p._id} p={p} />
				))}
			</table>
		)
	}

	return (
		<div className='container-fluid pt-2'>
			<div className='row'>
				<h4>cart / {Cart.length} Product</h4>
			</div>
			<div className='row'>
				<div className='col-md-8'>
					{!cart.length ? (
						<p>
							No products in the cart. <Link to='/'>continue shopping</Link>
						</p>
					) : (
						showCartItems()
					)}
				</div>
				<div className='col-md-4'>
					<h4>order summary</h4>
					<hr />
					<p>Products</p>
					{cart.map((c, i) => {
						return (
							<div key={i}>
								<p>
									{c.title} x {c.count} = ${c.price * c.count}
								</p>
							</div>
						)
					})}
					<hr />
					Total: <b>${getTotal()}</b>
					<hr />
					{user ? (
						<button
							onClick={saveOrderToDb}
							disabled={!cart.length}
							className='btn btn-sm btn-primary mt-2'>
							Proceed to checkout
						</button>
					) : (
						<button className='btn btn-sm btn-primary mt-2'>
							<Link
								to={{
									pathname: '/login',
									state: { from: 'cart' },
								}}>
								Login to checkout
							</Link>
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default Cart
