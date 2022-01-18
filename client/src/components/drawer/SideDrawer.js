import { Drawer } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const defaultImage =
	'https://images.unsplash.com/photo-1597673030062-0a0f1a801a31?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTR8fGxhcHRvcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'

const SideDrawer = () => {
	const dispatch = useDispatch()
	const { drawer, cart } = useSelector((state) => ({ ...state }))
	const imageStyle = {
		width: '100%',
		height: '50px',
		objectFit: 'cover',
	}
	return (
		<Drawer
			className='text-center'
			title={`Cart / ${cart.length} Product`}
			placement='right'
			onClose={() => {
				dispatch({
					type: 'SET_VISIBLE',
					payload: false,
				})
			}}
			visible={drawer}>
			{cart.map((p) => (
				<div key={p._id} className='row'>
					<div className='col'>
						{p.images[0] ? (
							<>
								<img src={p.images[0].url} style={imageStyle} alt={p.title} />
								<p className='text-center bg-secondary text-light'>
									{p.title} x {p.count}
								</p>
							</>
						) : (
							<>
								<img src={defaultImage} style={imageStyle} alt={p.title} />
								<p className='text-center bg-secondary text-light'>
									{p.title} x {p.count}
								</p>
							</>
						)}
					</div>
				</div>
			))}
			<Link to='/cart'>
				<button
					onClick={() => {
						dispatch({
							type: 'SET_VISIBLE',
							payload: false,
						})
					}}
					className='text-center btn btn-primary btn-raised btn-block'>
					Go To Cart
				</button>
			</Link>
		</Drawer>
	)
}

export default SideDrawer
