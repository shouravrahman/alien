import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
	getCategories,
	createCategory,
	removeCategory,
} from '../../../functions/category';
import AdminNav from '../../../components/nav/AdminNav';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import Filter from '../../../components/forms/Filter';
const CreateCategory = () => {
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [keyword, setKeyword] = useState(''); //for search/filter
	const { user } = useSelector((state) => ({
		...state,
	}));

	const loadCategories = () =>
		getCategories().then((categories) => setCategories(categories.data));

	useEffect(() => {
		loadCategories();
	}, []);
	const handleRemove = (slug) => {
		if (window.confirm('Are you sure you want to delete this category?')) {
			setLoading(true);
			removeCategory(slug, user.token)
				.then((res) => {
					setLoading(false);
					toast.error(`${res.data.name} category deleted`);
					loadCategories();
				})
				.catch((err) => {
					setLoading(false);
					toast.error(err.response.data);
				});
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createCategory(
			{
				name,
			},
			user.token
		)
			.then((res) => {
				setLoading(false);
				setName('');
				toast.success(`'${res.data.name} category created`);
				loadCategories();
			})
			.catch((err) => {
				setLoading(false);
				if (err.response.status === 400) toast.error(err.response.data);
			});
	};

	// HOC  baby
	const searched = (keyword) => (category) =>
		category.name.toLowerCase().includes(keyword);
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='colmd-2'>
					<AdminNav />
				</div>
				<div className='col'>
					{loading ? <h5 className='text-danger'> loading.. </h5> : <h4> Create category </h4>}
					<CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
					<Filter keyword={keyword} setKeyword={setKeyword} />
					{categories &&
						categories.filter(searched(keyword)).map((cat) => (
							<div className='alert alert-secondary' key={cat._id}>
								{cat.name}
								<span onClick={() => handleRemove(cat.slug)} className='btn btn-sm float-right'>
									<DeleteOutlined className='text-danger' />
								</span>
								<Link to={`admin/category/${cat.slug}`}>
									<span className='btn btn-sm float-right'>
										<EditOutlined className='text-warning' />
									</span>
								</Link>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default CreateCategory;
