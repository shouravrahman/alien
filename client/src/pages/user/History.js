import React from 'react';
import UserNav from '../../components/Nav/UserNav';

const History = () => {
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='colmd-2'>
					<UserNav />
				</div>
				<div className='col'>user history</div>
			</div>
		</div>
	);
};

export default History;
