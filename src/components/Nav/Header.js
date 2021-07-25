import React, { useState } from 'react';
import { Menu } from 'antd';
import {
	HomeOutlined,
	UserAddOutlined,
	UserOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { firebaseApp } from '../../firebase';
import { useDispatch } from 'react-redux';

const { SubMenu, Item } = Menu;
// require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);
const Header = () => {
	let dispatch = useDispatch();
	let history = useHistory();

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
			<SubMenu key='SubMenu' icon={<SettingOutlined />} title='Username'>
				<Item key='setting:1'>Option 1</Item>
				<Item key='setting:2'>Option 2</Item>
				<Item icon={<UserOutlined />} onClick={logout}>
					Logout
				</Item>
			</SubMenu>
			<Item
				key='register'
				icon={<UserAddOutlined />}
				// style={{ marginLeft: 'auto' }}
				className='ms-auto'
			>
				<Link to='/register'>Register</Link>
			</Item>
			<Item key='login' icon={<UserOutlined />}>
				<Link to='/login'>Login</Link>
			</Item>
		</Menu>
	);
};

export default Header;
