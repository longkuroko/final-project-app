import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'

const BackButton = ({ navigation }) => {
	return (
		<TouchableOpacity
			onPress={() => navigation.goBack()}
			style={styles.backControlContainer}>
			<View style={styles.backControl}>
				<Image
					autoPlay
					loop
					style={styles.backControlIcon}
					source={require('../../../assets/arrow_back.png')}
				/>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	backControlContainer: {
		position: 'absolute',
		top: 50,
		left: 0,
		flex: 1,
		zIndex: 1
	},
	backControl: {
		padding: 10,
		marginVertical: 5,
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10
	},
	backControlIcon: {
		width: 20,
		height: 20
	}
})

export default BackButton
