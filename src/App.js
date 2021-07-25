import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterComplete from './pages/auth/RegisterComplete';
function App() {
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
			</Switch>
		</>
	);
}

export default App;
