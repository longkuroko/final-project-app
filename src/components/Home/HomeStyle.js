import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	container: {
		// paddingVertical: 10
	},
	header: {
		flex: 1,
		paddingHorizontal: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	wrapText: {
		flex: 1,
		position: 'relative',
		width: 150,
		paddingVertical: 10
	},
	btnViewMore: {
		backgroundColor: '#035397',
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10,
		fontSize: 10
	},
	headerText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#fff',
		paddingRight: 30
	},
	divider: {
		position: 'absolute',
		width: 100,
		height: 2,
		backgroundColor: '#035397',
		bottom: 0,
		left: 0
	},
	categories: {
		display: 'flex',
		flexWrap: 'nowrap'
		// marginHorizontal: 5,
		// paddingVertical: 10,
	},

	Category: {
		// flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 5,
		height: 250
	},
	titleCategory: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	TextCategory: {
		fontSize: 12,
		color: '#fff',
		fontWeight: 'bold'
	},
	background: {
		flex: 1,
		height: 150,
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	icon2021: {
		position: 'absolute',
		left: 35,
		top: 0,
		width: 40,
		height: 40
	}
})
