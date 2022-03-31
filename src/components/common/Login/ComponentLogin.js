import React, { useState } from 'react'
import { TextInput, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styles } from './ComponentLogin.style'

const ComponentLogin = () => {
	const [account, setAccount] = useState({
		email: '',
		password: ''
	})
	return (
		<View style={styles.container}>
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder='Enter your email'
					placeholderTextColor='#003f5c'
					onChangeText={email => {
						setAccount({ ...account, email })
					}}
				/>
			</View>
			<View>
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
				<Text style={styles.forgot_button}>Forgot your passoword?</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.loginBtn}>
				<Text style={styles.loginText}>Login</Text>
			</TouchableOpacity>
		</View>
	)
}
export default ComponentLogin
