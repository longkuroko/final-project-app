import React, { useContext, useEffect, useState } from 'react'
import { TextInput, View, Text, Keyboard, ToastAndroid } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFonts } from 'expo-font'
import axios from 'axios'
import { styles } from './ComponentLogin.style'
import { USER_ACTION, UserContext } from '../../../context/UserContext'
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
					const { userId } = res.data.user
					setNotification({ type: true, message: '', isShow: true })
					// AsyncStorage.setItem('token', token)
					userCTX.login(USER_ACTION.LOGIN, token, userId)
					ToastAndroid.show('Đăng nhập thành công !', ToastAndroid.SHORT)
					navigation.navigate('Home')
				}
			})
			.catch(err => {
				if (err.response) {
					ToastAndroid.show(
						'Tài khoản hoặc mật khẩu chưa chính xác !',
						ToastAndroid.SHORT
					)
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
				SSG SHOPPING
			</Text>
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder='Tên đăng nhập...'
					placeholderTextColor='#003f5c'
					onChangeText={username => {
						setAccount({ ...account, username })
					}}
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder='Mật khẩu...'
					placeholderTextColor='#003f5c'
					onChangeText={password => {
						setAccount({ ...account, password })
					}}
					secureTextEntry
				/>
			</View>

			<TouchableOpacity>
				<Text style={styles.forgot_button}>Quên mật khẩu?</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Register')}>
				<Text style={{ color: 'blue' }}>Chưa có tài khoản? Đăng ký</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.loginBtn} onPress={() => login(account)}>
				<Text
					style={{
						color: '#fff',
						fontSize: 18,
						fontWeight: 'bold'
					}}>
					Đăng nhập
				</Text>
			</TouchableOpacity>
		</View>
	)
}
export default ComponentLogin
