import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './ComponentCommon.Style'

// Use to render in many screen, example login, logout
const ComponentCommon = () => {
	return (
		<View>
			<Text style={styles.text1}>Component Common In Both Screen </Text>
		</View>
	)
}

export default ComponentCommon
