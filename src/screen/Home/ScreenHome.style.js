import { Dimensions, StyleSheet } from 'react-native'

const width = Dimensions.get('window').width / 2 - 30
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		backgroundColor: '#fff'
	},
	header: {
		marginTop: 30,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	title1: {
		fontSize: 25,
		fontWeight: 'bold'
	},
	title2: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#2980B9'
	},
	iconSearch: {
		marginLeft: 20
	},
	card: {
		height: 225,
		backgroundColor: '#F1F1F1',
		marginHorizontal: 2,
		width,
		marginBottom: 10,
		borderRadius: 10,
		padding: 15
	},

	searchContainer: {
		height: 50,
		backgroundColor: '#F1F1F1',
		borderRadius: 10,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},

	input: {
		fontSize: 18,
		fontWeight: 'bold',
		flex: 1,
		color: '#141E27'
	},
	plantName: {
		fontWeight: 'bold',
		fontSize: 17,
		marginTop: 10
	},
	plantPrice: {
		fontSize: 19,
		fontWeight: 'bold'
	}
})
