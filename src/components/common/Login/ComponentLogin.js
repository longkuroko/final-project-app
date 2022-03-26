import React, { useState } from 'react'
import { TextInput, View } from 'react-native-web'
import { styles } from './ComponentLogin.style'

const ComponentLogin = () => {
	const [account, setAccount] = useState({
		email: '',
		password: ''
	})

	return (
		<View>
			<TextInput
				style={styles.input}
				placeholder='Email'
				onChangeText={email => {
					setAccount({ ...account, email })
				}}
			/>
			<TextInput
				style={styles.input}
				placeholder='Password'
				onChangeText={password => {
					setAccount({ ...account, password })
				}}
			/>
		</View>
	)
}
export default ComponentLogin
