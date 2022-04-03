import React, { useState } from 'react'
import { TextInput, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styles } from './ComponentRegister.style'

const ComponentRegister = () => {
	const [account, setAccount] = useState({
		name: '',
		email: '',
		password: ''
	})
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Go Shopping</Text>
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder='Enter your name'
					placeholderTextColor='#003f5c'
					onChangeText={name => {
						setAccount({ ...account, name })
					}}
				/>
			</View>
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
				<Text style={styles.forgot_button}>Account already exists? Login</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.registerBtn}>
				<Text>Register</Text>
			</TouchableOpacity>
		</View>
	)
}

export default ComponentRegister
