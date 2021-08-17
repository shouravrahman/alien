import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategory, updateCategory } from '../../../functions/category';
import AdminNav from '../../../components/nav/AdminNav';
import CategoryForm from '../../../components/forms/CategoryForm';

const UpdateCategory = ({ history, match }) => {
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));

	const loadCategory = () =>
		getCategory(match.params.slug).then((categories) => setName(categories.data.name));

	useEffect(() => {
		loadCategory();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		updateCategory(match.params.slug, { name }, user.token)
			.then((res) => {
				setLoading(false);
				setName('');
				toast.success(`${match.params.slug} category updated to ${res.data.name}`);
				history.push('/admin/category');
			})
			.catch((err) => {
				setLoading(false);
				if (err.response.status === 400) toast.error(err.response.data);
			});
	};

	return (
		<div className='container-fluid'>
			<div className='row p-2'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col-md-10'>
					{loading ? <h5 className='text-danger'>loading..</h5> : <h4>Update category</h4>}
					<CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
				</div>
			</div>
		</div>
	);
};

export default UpdateCategory;
