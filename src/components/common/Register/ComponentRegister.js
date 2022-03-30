import React from 'react'
import {
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Button, Alert
} from 'react-native'
import { styles } from './ComponentRegister.style'

const ComponentRegister = () => {
	return (
		<KeyboardAvoidingView style={styles.containerView} behavior='padding'>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.registerScreenContainer}>
					<View style={styles.registerFormView}>
						<Text style={styles.logoText}>Long Shopping</Text>
						<TextInput
							placeholder='name'
							placeholderColor='#c4c3cb'
							style={styles.registerFormTextInput}
						/>
						<TextInput
							placeholder='email'
							placeholderColor='#c4c3cb'
							style={styles.registerFormTextInput}
						/>
						<TextInput
							placeholder='Password'
							placeholderColor='#c4c3cb'
							style={styles.registerFormTextInput}
							secureTextEntry
						/>
            <Button
              title="Register"
              onPress={() => Alert.alert('Right button pressed')}
            />
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}

export default ComponentRegister
