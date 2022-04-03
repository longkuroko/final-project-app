import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	header: {
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
	}
})
