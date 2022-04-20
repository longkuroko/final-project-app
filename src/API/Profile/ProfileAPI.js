import { fetchAuth } from '../index'

export const getProfile = async () => {
	return await fetchAuth({
		slug: 'auth/profile',
		headers: '',
		method: 'GET'
	})
}
