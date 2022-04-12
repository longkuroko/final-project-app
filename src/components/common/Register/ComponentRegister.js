import React, { useContext, useState } from 'react'
import { TextInput, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFonts } from 'expo-font'
import axios from 'axios'
import { styles } from './ComponentRegister.style'
import { API_HOST } from '../../../util/API'
import { USER_ACTION, UserContext } from '../../../context/UserContext'

const ComponentRegister = ({ navigation }) => {
	const textState = {
		empty: 'empty',
		invalid: 'invalid',
		valid: 'valid'
	}

	const [account, setAccount] = useState({
		username: '',
		email: '',
		password: '',
		fullName: '',
		phoneNumber: '',
		verifiedPassword: ''
	})
	const userCTX = useContext(UserContext)

	const [phoneError, setPhoneError] = useState(textState.empty)
	const [nameUsernameError, setUsernameError] = useState(textState.empty)
	const [emailError, setEmailError] = useState(textState.empty)
	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)
	const [samePassword, setSamePassword] = useState(false)

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
					placeholder='Enter your name'
					placeholderTextColor='#003f5c'
					onChangeText={username => {
						const regex = /^[^\s]+( [^\s]+)+$/
						if (username.match(regex)) {
							setAccount({ ...account, username })
							setUsernameError(textState.valid)
						} else {
							setUsernameError(textState.invalid)
						}

						if (username.length === 0) {
							setUsernameError(textState.empty)
						}

						if (
							account.password === account.verifiedPassword &&
							account.password.length > 0 &&
							account.verifiedPassword.length > 0
						) {
							setSamePassword(true)
						} else {
							setSamePassword(false)
						}
					}}
				/>

				<View>
					{nameUsernameError === textState.invalid ? (
						<Text>username is invalid</Text>
					) : null}
				</View>
			</View>
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder='Enter your password'
					placeholderTextColor='#003f5c'
					onChangeText={password => {
						setAccount({ ...account, password })

						if (
							password === account.verifiedPassword &&
							password.length > 0 &&
							account.verifiedPassword.length > 0
						) {
							setSamePassword(false)
						} else {
							setSamePassword(true)
						}
					}}
					secureTextEntry
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder='Enter your password again'
					placeholderTextColor='#003f5c'
					onChangeText={verifiedPassword => {
						setAccount({ ...account, verifiedPassword })
						if (
							account.password === verifiedPassword &&
							account.verifiedPassword.length > 0 &&
							verifiedPassword > 0
						) {
							setSamePassword(false)
						} else {
							setSamePassword(true)
						}
					}}
					secureTextEntry
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder='Enter your email'
					placeholderTextColor='#003f5c'
					onChangeText={email => {
						const regex = /^[^\s@]+@[^\s@]+$/
						if (email.match(regex)) {
							setAccount({ ...account, email })
							setEmailError(textState.valid)
						} else {
							setEmailError(textState.invalid)
						}

						if (email.length === 0) {
							setEmailError(textState.empty)
						}

						if (
							account.password === account.verifiedPassword &&
							account.password.length > 0 &&
							account.verifiedPassword.length > 0
						) {
							setSamePassword(false)
						} else {
							setSamePassword(true)
						}
					}}
				/>
				<View>
					{emailError === textState.invalid ? (
						<Text>Email must be Empty</Text>
					) : null}
				</View>
			</View>
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder='Enter your full name'
					placeholderTextColor='#003f5c'
					onChangeText={fullName => {
						setAccount({ ...account, fullName })
					}}
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder='Enter your phone number'
					placeholderTextColor='#003f5c'
					onChangeText={phoneNumber => {
						const regex = /^[0-9]{10}$/
						if (phoneNumber.match(regex)) {
							setAccount({ ...account, phoneNumber })
							setPhoneError(textState.valid)
						} else if (!phoneNumber.match(regex)) {
							setPhoneError(textState.invalid)
						}

						if (phoneNumber.length === 0) {
							setPhoneError(textState.empty)
						}

						if (
							account.password === account.verifiedPassword &&
							account.password.length > 0 &&
							account.verifiedPassword.length > 0
						) {
							setSamePassword(false)
						} else {
							setSamePassword(true)
						}
					}}
				/>
				<View>
					{phoneError === textState.invalid ? (
						<Text>Phone number must be enough 10 digits</Text>
					) : null}
				</View>
			</View>

			<View>
				{samePassword && <Text>Password do not match</Text>}
				{error && <Text>Something wrong, try again !</Text>}
				{success && <Text>Sign up successfully !</Text>}
			</View>

			<TouchableOpacity onPress={() => navigation.navigate('ScreenLogin')}>
				<Text style={styles.forgot_button}>Account already exists? Login</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.registerBtn}>
				onPress =
				{() => {
					const information = {
						phone: account.phoneNumber,
						username: account.username,
						password: account.password,
						email: account.email
					}

					// Call api
					axios
						.post(`${API_HOST}/api/v1/auth/register`, { ...information })
						.then(response => {
							if (response.data.status === 201) {
								console.log(response)
								setError(false)
								setSuccess(true)

								const payload = {
									username: account.username,
									password: account.password
								}
								axios
									.post(`${API_HOST}/api/v1/auth/login`, payload)
									.then(data => {
										if (data.data.status === 201) {
											const navigate = () => {
												navigation.navigate('ScreenLogin')
											}

											const next = {
												username: payload.phone,
												token: data.data.token
											}
											userCTX.loginAfterSignup(
												USER_ACTION.REGISTER,
												next,
												navigate
											)
										} else if (data.data.status === 404) {
											setError(true)
										}
									})
									.catch(reason => {
										setError(true)
										console.log(reason)
									})
							} else if (response.data.status === 404) {
								setError(true)
							}
						})
						.catch(reason => {
							setError(true)
							console.log(reason)
						})
				}}
				<Text>Register</Text>
			</TouchableOpacity>
		</View>
	)
}

export default ComponentRegister
