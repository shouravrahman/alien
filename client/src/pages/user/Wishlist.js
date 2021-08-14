import React from 'react';
import UserNav from '../../components/Nav/UserNav';

const Wishlist = () => {
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='colmd-2'>
					<UserNav />
				</div>
				<div className='col'>user wishlist</div>
			</div>
		</div>
	);
};

export default Wishlist;
