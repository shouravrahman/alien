/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import SideDrawer from './components/drawer/SideDrawer'
import Header from './components/nav/Header'
import AdminRoute from './components/routes/AdminRoute'
import UserRoute from './components/routes/UserRoute'
import { auth } from './firebase'
import { currentUser } from './functions/auth'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreateCategory from './pages/admin/category/CreateCategory'
import UpdateCategory from './pages/admin/category/UpdateCategory'
import CreateCoupon from './pages/admin/coupon/CreateCoupon'
import AllProducts from './pages/admin/product/AllProducts'
import CreateProduct from './pages/admin/product/CreateProduct'
import UpdateProduct from './pages/admin/product/UpdateProduct'
import CreateSubcategory from './pages/admin/subcategory/CreateSubcategory'
import UpdateSubcategory from './pages/admin/subcategory/UpdateSubcategory'
import ForgotPassword from './pages/auth/ForgotPassword'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterComplete from './pages/auth/RegisterComplete'
import Cart from './pages/Cart'
import CategoryHome from './pages/category/CategoryHome'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import Payment from './pages/Payment'
import Product from './pages/Product'
import Shop from './pages/Shop'
import SubcategoryHome from './pages/subcategory/SubcategoryHome'
import History from './pages/user/History'
import Password from './pages/user/Password'
import Wishlist from './pages/user/Wishlist'

function App() {
	const dispatch = useDispatch()
	//check firebase auth state
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult()
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
						})
					})
					.catch((err) => console.log(err))
			}
		})
		//cleanup
		return () => unsubscribe()
	}, [])
	return (
		<>
			<Header />
			<SideDrawer />
			<ToastContainer />
			<Switch>
				<Route path='/' exact component={Home}></Route>
				<Route path='/login' exact component={Login}></Route>
				<Route path='/register' exact component={Register}></Route>
				<Route path='/register/complete' exact component={RegisterComplete}></Route>
				<Route path='/forgot/password' exact component={ForgotPassword}></Route>
				<UserRoute path='/user/history' exact component={History}></UserRoute>
				<UserRoute path='/user/password' exact component={Password}></UserRoute>
				<UserRoute path='/user/wishlist' exact component={Wishlist}></UserRoute>
				<AdminRoute
					path='/admin/dashboard'
					exact
					component={AdminDashboard}></AdminRoute>
				<AdminRoute
					path='/admin/category'
					exact
					component={CreateCategory}></AdminRoute>
				<AdminRoute
					path='/admin/category/:slug'
					exact
					component={UpdateCategory}></AdminRoute>
				<AdminRoute
					path='/admin/subcategory'
					exact
					component={CreateSubcategory}></AdminRoute>
				<AdminRoute
					path='/admin/subcategory/:slug'
					exact
					component={UpdateSubcategory}></AdminRoute>
				<AdminRoute
					path='/admin/product'
					exact
					component={CreateProduct}></AdminRoute>
				<AdminRoute
					path='/admin/products'
					exact
					component={AllProducts}></AdminRoute>
				<AdminRoute
					path='/admin/product/:slug'
					exact
					component={UpdateProduct}></AdminRoute>
				<AdminRoute path='/admin/coupon' exact component={CreateCoupon}></AdminRoute>
				<Route path='/product/:slug' exact component={Product}></Route>
				<Route path='/category/:slug' exact component={CategoryHome}></Route>
				<Route path='/subcategory/:slug' exact component={SubcategoryHome}></Route>
				<Route path='/shop' exact component={Shop}></Route>
				<Route path='/cart' exact component={Cart}></Route>
				<UserRoute path='/checkout' exact component={Checkout}></UserRoute>
				<UserRoute path='/payment' exact component={Payment}></UserRoute>
			</Switch>
		</>
	)
}

export default App
