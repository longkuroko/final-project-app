import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
    height: '100%'
	},
	image: {
		marginBottom: 40
	},
	title: {
		fontSize: 30,
		fontWeight: '400',
		lineHeight: 40,
		alignItems: 'center',
		letterSpacing: -0.01,
		marginBottom: 20,
		color: '#2980B9'
	},
	inputView: {
		backgroundColor: '#fff',
		borderWidth: 2,
		borderRadius: 10,
		width: '70%',
		height: 45,
		marginBottom: 20,
		alignItems: 'flex-start',
    position: "relative",
    marginVertical: 5
	},

	TextInput: {
    paddingHorizontal: 10,
    paddingVertical: 12,
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
	},
	eyePassword: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		paddingHorizontal: 10,
		paddingVertical: 12
	},
  Validation: {
    color: 'red',
    fontSize: 12,
    fontWeight: "400",
  },
  ContainerNoti : {
    flex: 1,
    zIndex: 10,
    position: 'absolute',
    marginBottom: 100,
    backgroundColor: 'rgba(0,0,0,.5)',
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  }
})
