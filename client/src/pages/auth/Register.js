/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Register = ({ history }) => {
	const [email, setEmail] = useState('');
	const { user } = useSelector((state) => ({ ...state }));
	useEffect(() => {
		if (user && user.token) {
			history.push('/');
		}
	}, [user]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		//config
		const config = {
			url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
			handleCodeInApp: true,
		};
		await auth.sendSignInLinkToEmail(email, config);
		//show toast notification for email confirmation
		toast.success(
			`Email is sent to ${email}. Click the link to complete your registration.`
		);
		//save email to localstorage
		window.localStorage.setItem('emailForRegistration', email);
		//clear state
		setEmail('');
	};
	//write the form in a function for better splitting
	const registerForm = () => (
		<form onSubmit={handleSubmit}>
			<MDBInput
				label='Email'
				// id='typeEmail'
				type='email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				size='md'
				autoFocus
				background
			/>
			{/* <button type='submit' className='btn btn-primary mt-3 pt-2'>
				Register
			</button> */}
			<MDBBtn type='submit' color='secondary' className='m-auto'>
				Register
			</MDBBtn>
		</form>
	);
	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4 className='text-primary mb-3'>Enter your Email:</h4>
					{registerForm()}
				</div>
			</div>
		</div>
	);
};

export default Register;
