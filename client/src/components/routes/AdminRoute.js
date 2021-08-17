import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';

const AdminRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const [ok, setOk] = useState(false);
	const ac = new AbortController();
	useEffect(() => {
		//check if the user is logged in
		if (user && user.token) {
			//check if it is admin role
			currentAdmin(user.token)
				.then(() => {
					//if role is admin set ok state to true
					setOk(true);
				})
				.catch((err) => {
					console.log('admin route err', err);
					setOk(false);
				});
		}
		return () => ac.abort();
	}, [user]);

	//if  the user is admin then ok must be true so render the routes now otherwise redirect
	return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
