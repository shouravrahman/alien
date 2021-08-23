import axios from 'axios'

export const createProduct = async (product, authtoken) =>
	await axios.post(`${process.env.REACT_APP_API}/product`, product, {
		headers: {
			authtoken,
		},
	})
export const getProductsByCount = async (count) =>
	await axios.get(`${process.env.REACT_APP_API}/products/${count}`)
<<<<<<< HEAD

export const removeProduct = async (slug, authtoken) =>
	await axios.post(`${process.env.REACT_APP_API}/product/${slug}`, {
		headers: {
			authtoken,
		},
	})
=======
>>>>>>> 75f1e5bdfdbf5b26faae0e8c34afad1d6a7fc596
