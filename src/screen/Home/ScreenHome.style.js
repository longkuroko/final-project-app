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
		padding: 15,
		alignItems: 'center'
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
		fontSize: 12,
		marginTop: 10
	},
	plantPrice: {
		fontSize: 15,
		fontWeight: 'bold'
	},
	headerDetail: {
		paddingHorizontal: 20,
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	imageContainer: {
		flex: 0.45,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	detailsContainer: {
		flex: 0.55,
		backgroundColor: '#F1F1F1',
		marginHorizontal: 7,
		marginBottom: 7,
		borderRadius: 20,
		marginTop: 30,
		paddingTop: 30
	},
	line: {
		width: 25,
		height: 2,
		backgroundColor: '#000000',
		marginBottom: 5,
		marginRight: 3
	},
	borderBtn: {
		borderColor: 'grey',
		borderWidth: 1,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		width: 60,
		height: 40
	},
	borderBtnText: { fontWeight: 'bold', fontSize: 28 },
	buyBtn: {
		width: 130,
		height: 50,
		backgroundColor: '#2980B9',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30
	},
	priceTag: {
		backgroundColor: '#2980B9',
		width: 80,
		height: 40,
		justifyContent: 'center',
		borderTopLeftRadius: 25,
		borderBottomLeftRadius: 25
	},
	categoryListContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
	},
	activeCategoryListText: {
		borderBottomWidth: 1,
		paddingBottom: 5
	},
	viewMoreBtn: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		height: 50,
		backgroundColor: '#fff',
		marginBottom: 5,
		fontStyle: 'normal',
		borderWidth: 3
	}
})
