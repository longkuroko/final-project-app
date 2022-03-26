import React from 'react'
import { StatusBar, Text, View } from 'react-native'
import { styles } from './AppStyle'

// eslint-disable-next-line react/function-component-definition
export default function App() {
	return (
		<View styles={styles.container}>
			<Text>Hello</Text>
			<StatusBar styles='auto' />
		</View>
	)
}
