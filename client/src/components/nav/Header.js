import React, { useState } from 'react'
import { Menu } from 'antd'
import {
	HomeOutlined,
	UserAddOutlined,
	UserOutlined,
	LogoutOutlined,
	SettingOutlined,
	ShoppingOutlined,
} from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import { firebaseApp } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import Searchbar from '../forms/Searchbar'

const { SubMenu, Item } = Menu

const Header = () => {
	let dispatch = useDispatch()
	let history = useHistory()
	let { user } = useSelector((state) => ({ ...state }))
	const [current, setCurrent] = useState('home')

	const handleClick = (e) => {
		setCurrent(e.key)
	}
	const logout = () => {
		firebaseApp.auth().signOut()
		dispatch({
			type: 'LOGOUT',
			payload: null,
		})
		history.push('/login')
	}

	return (
		<Menu
			onClick={handleClick}
			selectedKeys={[current]}
			mode='horizontal'
			// className='d-flex w-100'
		>
			{/* <div> */}
			<Item key='home' icon={<HomeOutlined />}>
				<Link to='/'>Home</Link>
			</Item>
			<Item key='shop' icon={<ShoppingOutlined />}>
				<Link to='/shop'>Shop</Link>
			</Item>
			{user && (
				<SubMenu
					key='SubMenu'
					icon={<SettingOutlined />}
					title={user.email && user.email.split('@')[0]}
					className='ml-auto'>
					{user && user.role === 'subscriber' && (
						<Item key='dashboard'>
							<Link to='/user/history'>Dashboard</Link>
						</Item>
					)}
					{user && user.role === 'admin' && (
						<Item key='dashboard'>
							<Link to='/admin/dashboard'>Dashboard</Link>
						</Item>
					)}
					<Item key='logout' icon={<LogoutOutlined />} onClick={logout}>
						Logout
					</Item>
				</SubMenu>
			)}
			{/* </div> */}
			{/* <div className='ml-auto d-flex'> */}
			{!user && (
				<Item
					key='register'
					icon={<UserAddOutlined />}
					// style={{ marginLeft: 'auto' }}
					className='ml-auto'>
					<Link to='/register'>Register</Link>
				</Item>
			)}
			{!user && (
				<Item key='login' icon={<UserOutlined />}>
					<Link to='/login'>Login</Link>
				</Item>
			)}

			<div className='p-1 d-inline'>
				<Searchbar />
			</div>
			{/* </div> */}
		</Menu>
	)
}

export default Header
