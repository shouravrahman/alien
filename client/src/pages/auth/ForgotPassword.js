/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';

const ForgotPassword = ({ history }) => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);
		//config
		const config = {
			url: process.env.REACT_APP_PASSWORD_RESET_REDIRECT_URL,
			handleCodeInApp: true,
		};
		await auth
			.sendPasswordResetEmail(email, config)
			.then(() => {
				setEmail('');
				setLoading(false);
				toast.success('Please check your email for password reset link');
			})
			.catch((error) => {
				setLoading(false);
				toast.error(error.message);
			});
	};
	const { user } = useSelector((state) => ({ ...state }));
	useEffect(() => {
		if (user && user.token) {
			history.push('/');
		}
	}, [user]);
	return (
		<div className='container col-md-6 offset-md-3 p-5'>
			{loading ? (
				// <h4 className='text-danger mb-2'>Loading...please wait..</h4>
				<Loader
					type='Plane'
					color='Blue'
					secondaryColor='Red'
					height={40}
					width={40}
					className='d-flex align-items-center justify-content-center
						 position-relative'
				/>
			) : (
				<h4 className='text-primary mb-2 text-center'>Forgot Password</h4>
			)}
			<form onSubmit={handleSubmit}>
				<input
					label='Email'
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoFocus
					className='mb-2'
				/>
				<button className='btn btn-raised' disabled={!email}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
