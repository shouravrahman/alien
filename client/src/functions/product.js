import axios from 'axios'

export const createProduct = async (product, authtoken) =>
	await axios.post(`${process.env.REACT_APP_API}/create`, product, {
		headers: {
			authtoken,
		},
	})
export const updateProduct = async (slug, product, authtoken) =>
	await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
		headers: {
			authtoken,
		},
	})
export const getProductsByCount = async (count) =>
	await axios.get(`${process.env.REACT_APP_API}/products/${count}`)

export const getProduct = async (slug) =>
	await axios.get(`${process.env.REACT_APP_API}/product/${slug}`)

export const removeProduct = async (slug, authtoken) =>
	await axios.post(`${process.env.REACT_APP_API}/product/${slug}`, {
		headers: {
			authtoken,
		},
	})

//for homepage product show
export const getProducts = async (sort, order, page) =>
	await axios.post(`${process.env.REACT_APP_API}/products/list`, {
		sort,
		order,
		page,
	})

export const totalProducts = async () =>
	await axios.get(`${process.env.REACT_APP_API}/products/total`)

export const productStar = async (productId, star, authtoken) =>
	await axios.put(
		`${process.env.REACT_APP_API}/product/star/${productId}`,
		{ star }, //object syntax to grab as req.body.star in the backend
		{
			headers: {
				authtoken,
			},
		}
	)

export const getRelatedProducts = async (productId) =>
	await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`)

export const fetchProductsByFilter = async (arg) =>
	await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg)
