import React from 'react';
import AdminNav from '../../components/Nav/AdminNav';

const AdminDashboard = () => {
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='colmd-2'>
					<AdminNav />
				</div>
				<div className='col'>Admin dashboard</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
