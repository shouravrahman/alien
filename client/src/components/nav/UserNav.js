import React from 'react';
import { Link } from 'react-router-dom';

const UserNav = () => {
	return (
		<nav>
			<ul className='nav flex-column'>
				<li className='nav-item'>
					<Link to='/user/history' className='nav-link'>
						Your History
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/user/password' className='nav-link'>
						Change Password
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/user/wishlist' className='nav-link'>
						View wishlist
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default UserNav;
