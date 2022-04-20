import React, { useContext, useState } from 'react'
import { TextInput, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFonts } from 'expo-font'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from './ComponentLogin.style'
import { USER_ACTION, UserContext } from '../../../context/UserContext'
import LoginAPI from '../../../API/Auth/LoginAPI'

const ComponentLogin = ({ navigation }) => {
	const [account, setAccount] = useState({
		username: '',
		password: ''
	})

	const userCTX = useContext(UserContext)

	const [fail, setFail] = useState(null)

	const handleLogic = async acc => {
		const response = await LoginAPI(acc)

		if (response && response.data) {
			await AsyncStorage.setItem('token', response.data.token)
			navigation.navigate('Home')
		}
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

			<TouchableOpacity
				style={styles.loginBtn}
				onPress={() => handleLogic(account)}>
				<Text>Login</Text>
			</TouchableOpacity>
		</View>
	)
}
export default ComponentLogin
