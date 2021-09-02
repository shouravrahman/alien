import React from 'react'
import StarRatings from 'react-star-ratings'

export const showAverage = (p) => {
	if (p && p.ratings) {
		let ratingsArray = p && p.ratings
		let total = []
		let length = ratingsArray.length

		ratingsArray.map((r) => total.push(r.star))

		let totalReduced = total.reduce((prev, next) => prev + next, 0)

		let highest = length * 5

		let result = (totalReduced * 5) / highest

		return (
			<div className='text-center pt-1 pb-2'>
				<span>
					<StarRatings
						rating={result}
						editing={false}
						starDimenshion='20px'
						starSpacing='2px'
						starRatedColor='red'
					/>
					({p.ratings.length})
				</span>
			</div>
		)
	}
}
