import React, { useEffect, useState } from 'react'
import { TextInput, View, Text, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFonts } from 'expo-font'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './ComponentRegister.style'
import { API_HOST } from '../../../util/API'
import Notification from '../../Notification'

const ComponentRegister = ({ navigation }) => {
	const [account, setAccount] = useState({
		username: '',
		email: '',
		password: '',
		fullname: '',
		phoneNumber: ''
	})

	const [showPassword, setShowPassword] = useState(true)
	const [validateFullName, setValidateFullName] = useState(false)
	const [validatePassword, setValidatePassword] = useState(false)
	const [validateEmail, setValidateEmail] = useState(false)
	const [validateUserName, setValidateUserName] = useState(false)
	const [Notifice, setNotifice] = useState({
		type: false,
		message: '',
		isShow: false
	})

	useEffect(() => {
		const isShow = setTimeout(() => {
			setNotifice({ type: false, message: '', isShow: false })
		}, 1500)
		return () => {
			clearTimeout(isShow)
		}
	}, [Notifice])

	const valiEmail = email => {
		const check =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return check.test(String(email).toLowerCase())
	}
	const isValidFullName = val => {
		if (val.trim().length <= 0) {
			setValidateFullName(true)
		} else {
			setValidateFullName(false)
		}
	}
	const isValidUserName = val => {
		if (val.trim().length <= 3) {
			setValidateUserName(true)
		} else {
			setValidateUserName(false)
		}
	}
	const isValidPassword = val => {
		const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
		console.log(val)
		if (val.trim().length <= 5) {
			setValidatePassword(true)
		} else if (format.test(val)) {
			setValidatePassword(true)
		} else {
			setValidatePassword(false)
		}
	}
	const isValidEmail = val => {
		if (!valiEmail(val)) {
			setValidateEmail(true)
		} else {
			setValidateEmail(false)
		}
	}

	const [loaded] = useFonts({
		// eslint-disable-next-line global-require
		Comfortaa: require('../../../../assets/fonts/Comfortaa-Bold.ttf')
	})

	if (!loaded) {
		return null
	}

	// eslint-disable-next-line no-shadow
	const handleRegister = account => {
		if (
			account.username === '' ||
			account.password === '' ||
			account.fullname === '' ||
			account.phoneNumber === '' ||
			account.email === ''
		) {
			setNotifice({
				type: false,
				message: 'Vui lòng nhập đầy đủ các trường...',
				isShow: true
			})
		} else if (account) {
			if (
				validateEmail ||
				validatePassword ||
				validateFullName ||
				validateUserName
			) {
				setNotifice({
					type: false,
					message: 'Vui lòng nhập thông tin đúng yêu cầu...',
					isShow: true
				})
				return
			}
			axios
				.post(`${API_HOST}/api/v1/auth/register`, account, {
					headers: {
						'x-private-key': 'MasdhaMASHF@adfn%sad',
						'x-application-name': 'AFF-APP'
					}
				})
				.then(res => {
					if (res.data) {
						console.log(res.data)
						setNotifice({
							type: true,
							message: 'Đăng ký thành công',
							isShow: true
						})
					}
				})
				.catch(err => {
					if (err.response) {
						if (err.response.status === 409) {
							setNotifice({
								type: false,
								message: 'Tài khoản đã tồn tại',
								isShow: true
							})
						} else if (err.response.status === 204) {
							setNotifice({
								type: false,
								message: 'Lỗi nhập, vui lòng kiểm tra lại',
								isShow: true
							})
						} else {
							setNotifice({
								type: false,
								message: 'Hệ thống đang bảo trì',
								isShow: true
							})
						}
					}
				})
		}
	}
	return (
		<View style={styles.container}>
			<Text style={{ ...styles.title, fontFamily: 'Comfortaa' }}>
				SSG SHOPPING
			</Text>
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder='Tên đăng nhập'
					onChangeText={username => setAccount({ ...account, username })}
					autoCorrect={false}
					autoCompleteType='off'
					onEndEditing={e => isValidUserName(e.nativeEvent.text)}
				/>
				{validateUserName ? (
					<Text style={styles.Validation}>
						Tài khoản phải dài hơn hoặc bằng 4 kí tự và không chứa kí tự đặc
						biệt
					</Text>
				) : null}
			</View>
			<View style={styles.inputView}>
				<View style={{ position: 'relative' }}>
					<TextInput
						style={styles.TextInput}
						placeholder='**********'
						onChangeText={password => setAccount({ ...account, password })}
						autoCorrect={false}
						autoCompleteType='off'
						autoCapitalize='none'
						onEndEditing={e => isValidPassword(e.nativeEvent.text)}
						secureTextEntry={showPassword}
					/>
					<TouchableOpacity
						style={styles.eyePassword}
						onPress={() => setShowPassword(!showPassword)}>
						{
							// Security on === true
							showPassword ? (
								<Icon name='eye-outline' size={15} />
							) : (
								<Icon name='eye-off-outline' size={15} />
							)
						}
					</TouchableOpacity>
				</View>
				{validatePassword ? (
					<Text style={styles.Validation}>
						Mật khẩu phải dài hơn hoặc bằng 6 kí tự và không chứa kí tự đặc biệt
					</Text>
				) : null}
			</View>
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder='email...'
					onChangeText={email => setAccount({ ...account, email })}
					autoCorrect={false}
					autoCompleteType='off'
					onEndEditing={e => isValidEmail(e.nativeEvent.text)}
				/>
				{validateEmail ? (
					<Text style={styles.Validation}>
						Vui lòng nhập theo cấu trúc : abc@gmail.com
					</Text>
				) : null}
			</View>
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder='Họ và tên...'
					onChangeText={fullname => setAccount({ ...account, fullname })}
					autoCorrect={false}
					autoCompleteType='off'
					onEndEditing={e => isValidFullName(e.nativeEvent.text)}
				/>
				{validateFullName ? (
					<Text style={styles.Validation}>Họ và tên không được để trống</Text>
				) : null}
			</View>
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder='Số điện thoại...'
					onChangeText={phoneNumber => setAccount({ ...account, phoneNumber })}
					autoCorrect={false}
					autoCompleteType='off'
					autoCapitalize='none'
					onEndEditing={e => isValidPassword(e.nativeEvent.text)}
				/>
				{validatePassword ? (
					<Text style={styles.Validation}>
						Mật khẩu phải dài hơn hoặc bằng 6 kí tự và không chứa kí tự đặc biệt
					</Text>
				) : null}
			</View>
			<TouchableOpacity onPress={() => navigation.navigate('ScreenLogin')}>
				<Text style={{ color: '#4D96FF' }}>Đã có tải khoản? đăng nhập</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.registerBtn}
				onPress={() => handleRegister(account)}>
				<Text
					style={{
						color: '#fff',
						fontSize: 18,
						fontWeight: 'bold'
					}}>
					Đăng ký
				</Text>
			</TouchableOpacity>
			{/* eslint-disable-next-line no-nested-ternary */}
			{Notifice.isShow ? (
				Notifice.message !== '' ? (
					<Text
						style={{
							fontSize: 15,
							color: '#fff',
							fontWeight: '500',
							textAlign: 'center'
						}}>
						{Notifice.message}
					</Text>
				) : (
					<View style={styles.ContainerNoti}>
						<ActivityIndicator size='large' color='#00c0d6' />
					</View>
				)
			) : null}
		</View>
	)
}

export default ComponentRegister
