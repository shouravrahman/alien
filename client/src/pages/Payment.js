import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import StripeCheckout from '../components/StripeCheckout'
import '../stripe.css'

//load stripe outside of components render to avoid recreate stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const payment = () => {
	return (
		<div className='container p-5 text-center'>
			<h4>complete your purchase</h4>
			<Elements stripe={promise}>
				<div className='col-md-8 offset-md-2'>
					<StripeCheckout />
				</div>
			</Elements>
		</div>
	)
}

export default payment
