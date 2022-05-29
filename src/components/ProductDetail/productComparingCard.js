import React from 'react'
import {
	TouchableOpacity,
	View,
	Image,
	Text,
	StyleSheet,
	Linking,
	Alert
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useFonts } from 'expo-font'
import 'intl'
import 'intl/locale-data/jsonp/fr'

const ProductComparingCard = ({ product, navigation, variantPrice }) => {
	const openUrl = async url => {
		const isSupported = await Linking.canOpenURL(url)
		if (isSupported) {
			await Linking.openURL(url)
		} else {
			Alert.alert('Can not open this link!')
		}
	}
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
						{product.name}
					</Text>
					<View style={styles.productPriceContainer}>
						<Text style={styles.productPriceText}>{variantPrice}</Text>
					</View>
					<View>
						<Text style={styles.merchant}>Nơi bán: {product.merchant}</Text>
						<TouchableOpacity
							onPress={() => {
								openUrl(product.originalUrl)
							}}
							style={styles.linkView}>
							<Text style={styles.linkProduct}>Truy cập nơi bán</Text>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	comparingContainer: {
		margin: 8,
		borderRadius: 10,
		elevation: 20,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		shadowColor: '#333',
		backgroundColor: '#fff'
	},
	card: {
		width: 300,
		height: 100,
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
		fontSize: 14,
		maxWidth: '100%',
		color: '#000000',
		fontWeight: '600',
		letterSpacing: 1
	},
	productPriceContainer: {
		marginTop: 4,
		flexDirection: 'row',
		alignItems: 'center',
		opacity: 0.6
	},
	productPriceText: {
		fontSize: 14,
		fontWeight: '400',
		maxWidth: '85%',
		marginRight: 4
	},
	linkView: {
		flexDirection: 'row'
	},
	productLink: {
		fontSize: 16,
		color: '#000000',
		backgroundColor: '#fff',
		padding: 8,
		borderRadius: 100
	},
	merchant: {
		fontSize: 15,
		fontFamily: 'Nunito',
		fontWeight: '300'
	},
	linkProduct: {
		fontSize: 15,
		color: '#0043f9'
	}
})
export default ProductComparingCard
