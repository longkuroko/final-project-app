import React, { useContext, useEffect, useState } from 'react'
import { TextInput, View, Text, Keyboard } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFonts } from 'expo-font'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { styles } from './ComponentLogin.style'
import { USER_ACTION, UserContext } from '../../../context/UserContext'
import LoginAPI from '../../../API/Auth/LoginAPI'
import { API_HOST } from '../../../util/API'

const ComponentLogin = ({ navigation }) => {
	const [account, setAccount] = useState({
		username: '',
		password: ''
	})

	const userCTX = useContext(UserContext)
	const [Notification, setNotification] = useState({
		type: false,
		message: '',
		isShow: false
	})

	// const handleLogic = async acc => {
	// 	const response = await LoginAPI(acc)
	//
	// 	if (response && response.data) {
	// 		await AsyncStorage.setItem('token', response.data.token)
	// 		navigation.navigate('Home')
	// 	}
	// }

	useEffect(() => {
		if (Notification.message.length > 0) {
			const isShow = setTimeout(() => {
				setNotification({ type: false, message: '', isShow: false })
			}, 1500)
			return () => {
				clearTimeout(isShow)
			}
		}
	}, [Notification])

	const login = acc => {
		Keyboard.dismiss()
		axios
			.post(`${API_HOST}/api/v1/auth/login`, acc, {
				headers: {
					'x-private-key': 'MasdhaMASHF@adfn%sad',
					'x-application-name': 'AFF-APP'
				}
			})
			.then(res => {
				if (res) {
					const token = JSON.stringify(res.data.token)
					setNotification({ type: true, message: '', isShow: true })
					// AsyncStorage.setItem('token', token)
          userCTX.login(USER_ACTION.LOGIN, token)
					navigation.navigate('Home')
				}
			})
			.catch(err => {
				if (err.response) {
					setNotification({
						type: false,
						message: 'Tài khoản mật khẩu chưa chính xác',
						isShow: true
					})
				}
			})
	}

	const [loaded] = useFonts({
		// eslint-disable-next-line global-require
		Comfortaa: require('../../../../assets/fonts/Comfortaa-Bold.ttf')
	})

	if (!loaded) {
		return null
	}
	return (
		<View style={styles.container}>
			<Text style={{ ...styles.title, fontFamily: 'Comfortaa' }}>
				Go Shopping
			</Text>
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder='Enter your username'
					placeholderTextColor='#003f5c'
					onChangeText={username => {
						setAccount({ ...account, username })
					}}
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder='Enter your password'
					placeholderTextColor='#003f5c'
					onChangeText={password => {
						setAccount({ ...account, password })
					}}
					secureTextEntry
				/>
			</View>

			<TouchableOpacity>
				<Text style={styles.forgot_button}>Forgot your password?</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('ScreenRegister')}>
				<Text style={styles.forgot_button}>Sign up</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.loginBtn} onPress={() => login(account)}>
				<Text>Login</Text>
			</TouchableOpacity>
		</View>
	)
}
export default ComponentLogin
