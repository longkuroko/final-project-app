import { fetch } from '../index'

export default async function LoginAPI(acc) {
	console.log(acc)
	return await fetch({
		slug: 'auth/login',
		headers: '',
		method: 'POST',
		data: acc
	})
}
