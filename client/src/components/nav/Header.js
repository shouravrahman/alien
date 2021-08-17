import React, { useState } from 'react';
import { Menu } from 'antd';
import {
	HomeOutlined,
	UserAddOutlined,
	UserOutlined,
	LogoutOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { firebaseApp } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';

const { SubMenu, Item } = Menu;

const Header = () => {
	let dispatch = useDispatch();
	let history = useHistory();
	let { user } = useSelector((state) => ({ ...state }));
	const [current, setCurrent] = useState('home');

	const handleClick = (e) => {
		setCurrent(e.key);
	};
	const logout = () => {
		firebaseApp.auth().signOut();
		dispatch({
			type: 'LOGOUT',
			payload: null,
		});
		history.push('/login');
	};

	return (
		<Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
			<Item key='home' icon={<HomeOutlined />}>
				<Link to='/'>Home</Link>
			</Item>
			{user && (
				<SubMenu
					key='SubMenu'
					icon={<SettingOutlined />}
					title={user.email && user.email.split('@')[0]}
					className='ms-auto'
				>
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
			{!user && (
				<Item
					key='register'
					icon={<UserAddOutlined />}
					// style={{ marginLeft: 'auto' }}
					className='ms-auto'
				>
					<Link to='/register'>Register</Link>
				</Item>
			)}
			{!user && (
				<Item key='login' icon={<UserOutlined />}>
					<Link to='/login'>Login</Link>
				</Item>
			)}
		</Menu>
	);
};

export default Header;