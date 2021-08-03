/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterComplete from './pages/auth/RegisterComplete';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ForgotPassword from './pages/auth/ForgotPassword';
import { currentUser } from './functions/auth';
function App() {
	const dispatch = useDispatch();
	//check firebase auth state
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();
				currentUser(idTokenResult.token)
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
						});
					})
					.catch((err) => console.log(err));
			}
		});
		//cleanup
		return () => unsubscribe();
	}, []);
	return (
		<>
			<Header />
			<ToastContainer />
			<Switch>
				<Route path='/' exact component={Home}></Route>
				<Route path='/login' exact component={Login}></Route>
				<Route path='/register' exact component={Register}></Route>
				<Route
					path='/register/complete'
					exact
					component={RegisterComplete}
				></Route>
				<Route path='/forgot/password' exact component={ForgotPassword}></Route>
			</Switch>
		</>
	);
}

export default App;