import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';

function App() {
	return (
		<>
			<Header />
			<Switch>
				<Route path='/' exact component={Home}></Route>
				<Route path='/login' exact component={Login}></Route>
				<Route path='/register' exact component={Register}></Route>
			</Switch>
		</>
	);
}

export default App;
