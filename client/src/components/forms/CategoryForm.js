import React from 'react';

const CategoryForm = ({ handleSubmit, name, setName }) => {
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						type='text'
						className='form-control'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						autoFocus
					/>
					<br />
					<button className='btn btn-outline-primary'>Save</button>
				</div>
			</form>
		</div>
	);
};

export default CategoryForm;
