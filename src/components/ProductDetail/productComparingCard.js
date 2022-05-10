import React from 'react'
import {
	TouchableOpacity,
	View,
	Image,
	Text,
	StyleSheet,
	Linking,
	Alert,
	Button
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useFonts } from 'expo-font'

const ProductComparingCard = ({ product, navigation }) => {
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
				<View style={styles.productPriceContainer}>
					<Text style={styles.productPriceText}>{product.price}</Text>
				</View>
				<View>
					<Text style={styles.merchant}>{product.merchant}</Text>
					<Button
						style={styles.linkView}
						title='Truy cập'
						onPress={() => {
							openUrl(product.productUrl)
						}}
					/>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
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
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 10,
		marginRight: 22
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
		width: 100
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
	}
})
export default ProductComparingCard
