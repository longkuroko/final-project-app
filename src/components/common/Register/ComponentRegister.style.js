import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},

	image: {
		marginBottom: 40
	},
	title: {
		fontSize: 30,
		fontWeight: '400',
		fontFamily: 'Comfortaa-Bold',
		lineHeight: 40,
		alignItems: 'center',
		letterSpacing: -0.01,
		marginBottom: 20,
		color: '#2980B9'
	},
	inputView: {
		backgroundColor: '#fff',
		borderWidth: 1,
		borderRadius: 10,
		width: '70%',
		height: 45,
		marginBottom: 20,
		alignItems: 'flex-start'
	},

	TextInput: {
		height: 50,
		flex: 1,
		padding: 10,
		marginLeft: 20
	},

	forgot_button: {
		height: 30,
		marginBottom: 30
	},

	registerBtn: {
		width: 200,
		borderRadius: 10,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 40,
		backgroundColor: '#4D96FF'
	}
})
