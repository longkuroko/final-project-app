import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_HOST } from '../util/API'

export const fetch = async ({ slug, headers, ...options }) => {
	console.log(options)
	try {
		return await axios({
			url: `${API_HOST}/api/v1/${slug}`,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-private-key': 'MasdhaMASHF@adfn%sad',
				'x-application-name': 'AFF-APP',
				...headers
			},
			...options
		})
	} catch (error) {
		if (error.response) {
			return Promise.reject({
				data: error.response.data,
				status: error.response.status,
				statusText: error.response.statusText
			}).then()
		}
		await Promise.reject('Server Error')
	}
}

export const fetchAuth = async ({ slug, headers, ...options }) => {
	try {
		const token = await AsyncStorage.getItem('token')
		return await axios({
			url: `${API_HOST}/api/v1/${slug}`,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-private-key': 'MasdhaMASHF@adfn%sad',
				'x-application-name': 'AFF-APP',
				Authorization: `Bearer ${token}`,
				...headers
			},
			...options
		})
	} catch (error) {
		if (error.response) {
			return Promise.reject({
				data: error.response.data,
				status: error.response.status,
				statusText: error.response.statusText
			}).then()
		}
		await Promise.reject('Server Error')
	}
}
