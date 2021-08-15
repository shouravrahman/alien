import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
	return (
		<nav>
			<ul className='nav flex-column'>
				<li className='nav-item'>
					<Link to='/admin/dashboard' className='nav-link'>
						Dashboard
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/admin/product' className='nav-link'>
						Create Product
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/admin/products' className='nav-link'>
						All products
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/admin/category' className='nav-link'>
						Category
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/admin/sub' className='nav-link'>
						Subcategory
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/admin/coupon' className='nav-link'>
						coupon
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/user/password' className='nav-link'>
						Password
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default AdminNav;
