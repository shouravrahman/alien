import React from 'react';

const Filter = ({ keyword, setKeyword }) => {
	const handleSearchChange = (e) => {
		e.preventDefault();
		setKeyword(e.target.value.toLowerCase());
	};
	return (
		<input
			type='search'
			value={keyword}
			placeholder='Filter categories'
			className='form-control mb-4'
			onChange={handleSearchChange}
		/>
	);
};

export default Filter;
