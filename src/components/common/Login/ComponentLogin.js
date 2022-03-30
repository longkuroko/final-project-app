import React, { useState } from 'react'
import {
	TextInput,
	View,
	Text,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
	Button
} from 'react-native'
import { styles } from './ComponentLogin.style'

const ComponentLogin = () => {
	const [account, setAccount] = useState({
		email: '',
		password: ''
	})
	return (
		<KeyboardAvoidingView style={styles.containerView} behavior='padding'>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.loginScreenContainer}>
					<View style={styles.loginFormView}>
						<Text style={styles.logoText}>Long Shopping</Text>
						<TextInput
							placeholder='username or email'
							placeholderColor='#c4c3cb'
							style={styles.loginFormTextInput}
							onChangeText={email => {
								setAccount({ ...account, email })
							}}
						/>
						<TextInput
							placeholder='Password'
							placeholderColor='#c4c3cb'
							style={styles.loginFormTextInput}
							secureTextEntry
							onChangeText={password => {
								setAccount({ ...account, password })
							}}
						/>
						<Button style={styles.loginButton} title='Login' />
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}
export default ComponentLogin
