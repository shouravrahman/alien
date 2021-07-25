import React, { useState, useEffect } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const RegisterComplete = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			toast.error(`Email and password required`);
			return;
		}
		if (password.length < 6) {
			toast.error(`Password must be at least 6 charecters long`);
		}
		try {
			const result = await auth.signInWithEmailLink(
				email,
				window.location.href
			);

			if (result.user.emailVerified) {
				//remove useremail from local storage
				window.localStorage.removeItem('emailForRegistration');
				//get user id token
				let user = auth.currentUser;
				await user.updatePassword(password);
				const idTokenResult = await user.getIdTokenResult();
				//redux store
				//redirect
				history.push('/');
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
	useEffect(() => {
		setEmail(window.localStorage.getItem('emailForRegistration'));
	}, []);
	//write the form in a function for better splitting
	const registerCompleteForm = () => (
		<form onSubmit={handleSubmit}>
			<MDBInput
				label='Email'
				id='typeEmail'
				type='email'
				value={email}
				size='md'
				disabled
			/>
			<MDBInput
				label='Password'
				// id='typePassword'
				type='password'
				value={password}
				size='md'
				onChange={(e) => setPassword(e.target.value)}
				autofocus
				background
			/>
			{/* <button type='submit' className='btn btn-primary mt-3 pt-2'>
				Register
			</button> */}
			<MDBBtn type='submit' color='secondary' className='m-auto'>
				Complete Registration
			</MDBBtn>
		</form>
	);
	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4 className='text-primary mb-3'>Complete Registration:</h4>
					{registerCompleteForm()}
				</div>
			</div>
		</div>
	);
};

export default RegisterComplete;
