import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'
const Searchbar = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const { search } = useSelector((state) => ({ ...state }))
	const { text } = search

	const handleChange = (e) => {
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: e.target.value },
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		history.push(`/shop?${text}`)
	}

	return (
		<form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit}>
			<input
				onChange={handleChange}
				type='text'
				className='form-control mr-sm-2'
				placeholder='search'
				value={text}
			/>
			<SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} />
		</form>
	)
}

export default Searchbar
