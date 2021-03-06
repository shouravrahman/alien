/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import { auth, googleAuthProvider } from '../../firebase'
import { toast } from 'react-toastify'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { MailOutlined, GoogleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { createOrUpdateUser } from '../../functions/auth'
import Loader from 'react-loader-spinner'

const Login = () => {
	const [email, setEmail] = useState('shouravrahman006@gmail.com')
	const [password, setPassword] = useState('hello1234')
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()
	let history = useHistory()

	const { user } = useSelector((state) => ({ ...state }))

	useEffect(() => {
		let intended = history.location.state

		if (intended) {
			return
		} else {
			if (user && user.token) {
				history.push('/')
			}
		}
	}, [user])

	const roleBasedRedirect = (res) => {
		let intended = history.location.state
		if (intended) {
			history.push(intended.from)
		} else {
			if (res.data.role === 'admin') {
				history.push('/admin/dashboard')
			} else {
				history.push('user/history')
			}
		}
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		try {
			const result = await auth.signInWithEmailAndPassword(email, password)
			const { user } = result
			const idTokenResult = await user.getIdTokenResult()
			// console.log(idTokenResult.token);
			// console.log(idTokenResult.token);ss
			createOrUpdateUser(idTokenResult.token)
				.then((res) => {
					dispatch({
						type: 'LOGGED_IN_USER',
						payload: {
							name: res.data.name,
							email: res.data.email,
							token: idTokenResult.token,
							role: res.data.role,
							_id: res.data._id,
						},
					})
					roleBasedRedirect(res)
				})
				.catch((err) => console.log(err))
			// history.push('/');
		} catch (error) {
			toast.error(error.message)
			setLoading(false)
		}
	}
	const googleLogin = async () => {
		auth
			.signInWithPopup(googleAuthProvider)
			.then(async (result) => {
				const { user } = result
				const idTokenResult = await user.getIdTokenResult()
				createOrUpdateUser(idTokenResult.token)
					.then((res) => {
						dispatch({
							type: 'LOGGED_IN_USER',
							payload: {
								name: res.data.name,
								email: res.data.email,
								token: idTokenResult.token,
								role: res.data.role,
								_id: res.data._id,
							},
						})
						roleBasedRedirect(res)
					})
					.catch((err) => console.log(err))
				// history.push('/');
			})
			.catch((error) => toast.error(error.message))
	}

	//write the form in a function for better splitting
	const loginForm = () => (
		<form className='form-group'>
			<input
				className='form-control mb-3'
				label='Email'
				// id='typeEmail'
				type='email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				autoFocus
			/>
			<input
				className='form-control mb-3'
				label='Password'
				// id='typeEmail'
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			{/* <button type='submit' className='btn btn-primary mt-3 pt-2'>
				Register
			</button> */}
			<Button
				type='primary'
				onClick={handleSubmit}
				className='mt-4 mb-3'
				block
				shape='round'
				icon={<MailOutlined />}
				size='large'
				disabled={!email || password.length < 6}>
				Sign In With Email/Password
			</Button>
			<Button
				type='danger'
				className='mb-3'
				block
				shape='round'
				icon={<GoogleOutlined />}
				size='large'
				onClick={googleLogin}>
				Sign In With Google
			</Button>
			<Link to='/forgot/password' className='text-danger'>
				Forgot password
			</Link>
		</form>
	)
	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					{loading ? (
						// <h4 className='text-danger mb-2'>Loading...please wait..</h4>

						// <div className='align-middle text-center ml-auto'>
						// 	<div className='spinner-grow text-primary ' role='status'>
						// 		<span className='sr-only'>Loading...</span>
						// 	</div>
						// </div>

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
						<>
							<h4 className='text-primary mb-4 text-center'>Login</h4>
							{loginForm()}
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default Login
