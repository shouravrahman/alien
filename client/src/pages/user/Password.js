import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const Password = () => {
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		//prevent page reloading
		e.preventDefault();
		//set loading state to true
		setLoading(true);
		//find the current user and update the password using firebase methods
		await auth.currentUser
			.updatePassword(password)
			.then(() => {
				//set loading state to false
				setLoading(false);
				//clean input field
				setPassword('');
				//show success message
				toast.success('password updated');
			})
			.catch((err) => {
				//set loading state to false
				setLoading(false);
				//show err message
				toast.error(err.message);
			});
	};
	const passwordUpdateForm = () => (
		<form onSubmit={handleSubmit}>
			<div className='form-group p-4'>
				<label className='lead'>Enter Current Password</label>
				<input
					onChange={(e) => setPassword(e.target.value)}
					type='password'
					className='form-control'
					placeholder='enter your password'
					disabled={loading}
					value={password}
				/>
				<button
					className='btn btn-primary'
					disabled={!password || password.length < 6 || loading}>
					Submit
				</button>
			</div>
		</form>
	);
	return (
		<div className='container-fluid mt-2'>
			<div className='row'>
				<div className='col-md-2'>
					<UserNav />
				</div>
				<div className='col'>
					{loading ? (
						<h4 className='text-danger'>loading..</h4>
					) : (
						<h4 className='text-center mt-4'>Update Password</h4>
					)}

					{passwordUpdateForm()}
				</div>
			</div>
		</div>
	);
};

export default Password;
