import React, { useState } from 'react'
import { TextInput, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFonts } from 'expo-font'
import { styles } from './ComponentRegister.style'

const ComponentRegister = ({ navigation }) => {
	const [account, setAccount] = useState({
		username: '',
		email: '',
		password: '',
    fullName: '',
    phoneNumber: '',
    verifiedPassword: ''
	})
	const [loaded] = useFonts({
		// eslint-disable-next-line global-require
		Comfortaa: require('../../../../assets/fonts/Comfortaa-Bold.ttf')
	})

	if (!loaded) {
		return null
	}

  const [phoneError, setPhoneError] = useState('Empty')
  const [nameUsernameError, setUsernameError] = useState('Empty')
  const [emailError, setEmailError] = useState('Empty')
  const [error, setError] =  useState(false)
  const [success, setSuccess] = useState(false)
  const [samePassword, setSamePassword] = useState(false)
  const [touchable, setTouchable] = useState(true)

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
              setUsernameError('Valid')
            } else {
              setUsernameError('Invalid')
            }

            if (username.length === 0) {
              setUsernameError('Empty')
            }

            if(account.password === account.verifiedPassword &&
            account.password.length > 0 &&
            account.verifiedPassword.length > 0) {
              setSamePassword(true)
            } else {
              setSamePassword(false)
            }

            if (username.match(regex) &&
            emailError === 'Valid ' &&
            setUsernameError === 'Valid' &&
            username.length > 0 &&
            account.password === account.verifiedPassword &&
            account.password.length > 0 && account.verifiedPassword.length > 0) {
              setTouchable(false)
            } else {
              setTouchable(true)
            }
					}}
				/>

        {nameUsernameError === 'InValid' ? <Text>username is invalid</Text> : null }
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
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Enter your password again'
          placeholderTextColor='#003f5c'
          onChangeText={verifiedPassword => {
            setAccount({ ...account, verifiedPassword })
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
            setAccount({ ...account, email })
          }}
        />
      </View><View style={styles.inputView}>
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
          setAccount({ ...account, phoneNumber})
        }}
      />
    </View>
			<TouchableOpacity onPress={() => navigation.navigate('ScreenLogin')}>
				<Text style={styles.forgot_button}>Account already exists? Login</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.registerBtn}>
				<Text>Register</Text>
			</TouchableOpacity>
		</View>
	)
}

export default ComponentRegister
