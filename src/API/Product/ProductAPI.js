import { fetch } from '../index'

export const getProduct = async () => {
	return await fetch({
		slug: 'mobile/product',
		headers: '',
		method: 'GET'
	})
}
