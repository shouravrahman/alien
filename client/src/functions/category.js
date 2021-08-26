import axios from 'axios'

//for listing all categories
export const getCategories = async () =>
	await axios.get(`${process.env.REACT_APP_API}/categories`)

//for single category
export const getCategory = async (slug) =>
	await axios.get(`${process.env.REACT_APP_API}/category/${slug}`)

//remove category
export const removeCategory = async (slug, authtoken) =>
	await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
		headers: {
			authtoken,
		},
	})
//update category
export const updateCategory = async (slug, category, authtoken) =>
	await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
		headers: {
			authtoken,
		},
	})
//create category
export const createCategory = async (category, authtoken) =>
	await axios.post(`${process.env.REACT_APP_API}/category`, category, {
		headers: {
			authtoken,
		},
	})

//get subcategories
export const getSubcategories = async (_id) =>
	await axios.get(`${process.env.REACT_APP_API}/category/subcategories/${_id}`)
