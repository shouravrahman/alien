import React from 'react'
import { Card, Skeleton } from 'antd'

const LoadingCard = ({ count }) => {
	const cards = () => {
		let totalCards = []

		for (let i = 0; i < count.length; i++) {
			totalCards.push(
				<Card className='col-md-4 m-2'>
					<Skeleton active></Skeleton>
				</Card>
			)
		}
		return totalCards
	}
	return <div className='row pb-5'>{cards()}</div>
}

export default LoadingCard
