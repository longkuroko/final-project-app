import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'
import { useFonts } from 'expo-font'

const ProductFavouriteCard = ({ product, navigation }) => {
	useFonts({
		// eslint-disable-next-line global-require
		Nunito: require('../../../assets/fonts/Nunito-Light.ttf')
	})

	return (
		<View style={styles.comparingContainer}>
			<TouchableOpacity
				onPress={() => navigation.navigate('Detail', product)}
				style={styles.card}>
				<View style={styles.container}>
					<Image
						source={{ uri: product.thumbnail }}
						style={styles.productImage}
					/>
				</View>
				<View style={{}}>
					<Text style={{ ...styles.productNameText, fontFamily: 'Nunito' }}>
						{product.productName}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	comparingContainer: {
		margin: 5,
		borderRadius: 2,
		elevation: 20,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		shadowColor: '#333',
		backgroundColor: '#fff'
	},
	card: {
		width: 320,
		height: 80,
		marginVertical: 6,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 5
	},
	container: {
		width: '30%',
		height: 100,
		padding: 14,
		justifyContent: 'center',
		alignItems: 'center'
	},
	productImage: {
		width: 100,
		height: '100%',
		resizeMode: 'contain'
	},
	productNameText: {
		fontSize: 12,
		maxWidth: '90%',
		color: '#000000',
		fontWeight: '400',
		letterSpacing: 1,
		position: 'relative'
	}
})

export default ProductFavouriteCard
