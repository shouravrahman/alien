import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
	return (
		<nav>
			<ul className='nav flex-column'>
				<li className='nav-item'>
					<Link to='/admin/dashboard' className='nav-link navbar-link-color'>
						Dashboard
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/admin/product' className='nav-link navbar-link-color'>
						Create Product
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/admin/products' className='nav-link navbar-link-color'>
						All products
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/admin/category' className='nav-link navbar-link-color'>
						Category
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/admin/subcategory' className='nav-link navbar-link-color'>
						Subcategory
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/admin/coupon' className='nav-link navbar-link-color'>
						coupon
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/user/password' className='nav-link navbar-link-color'>
						Password
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default AdminNav
