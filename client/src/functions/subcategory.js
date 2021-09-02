import axios from 'axios'

//for listing all subcategories
export const getSubcategories = async () =>
	await axios.get(`${process.env.REACT_APP_API}/subcategories`)

//for single subcategory
export const getSubcategory = async (slug) =>
	await axios.get(`${process.env.REACT_APP_API}/subcategory/${slug}`)

//remove category
export const removeSubcategory = async (slug, authtoken) =>
	await axios.delete(`${process.env.REACT_APP_API}/subcategory/${slug}`, {
		headers: {
			authtoken,
		},
	})
//update category
export const updateSubcategory = async (slug, subcategory, authtoken) =>
	await axios.put(`${process.env.REACT_APP_API}/subcategory/${slug}`, subcategory, {
		headers: {
			authtoken,
		},
	})
//create category
export const createSubcategory = async (subcategory, authtoken) =>
	await axios.post(`${process.env.REACT_APP_API}/subcategory`, subcategory, {
		headers: {
			authtoken,
		},
	})
