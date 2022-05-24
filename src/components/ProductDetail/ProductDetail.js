import React, { useEffect, useState } from 'react'
import {
	Image,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
	StatusBar,
	Dimensions,
	Linking,
	Alert,
	FlatList
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import { useFonts } from 'expo-font'
import RelatedProductList from './RelatedProductList'
import ProductCompareList from './ProductCompareList'
import { API_HOST } from '../../util/API'
import 'intl'
import 'intl/locale-data/jsonp/fr'

const { width } = Dimensions.get('window')
const ProductDetail = ({ navigation, route }) => {
	const product = route.params
	const [products, setProducts] = useState([])
	const [productDetails, setProductDetails] = useState([])
  const relatedProductName = product.productName.slice(0, 15);

	const formatCurrency = new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND'
	}).format(product.price)

	useFonts({
		// eslint-disable-next-line global-require
		Nunito: require('../../../assets/fonts/Nunito-ExtraLight.ttf')
	})

	// call API get product Detail
	useEffect(() => {
		axios
			.get(`${API_HOST}/api/v1/mobile/product/${product.productTemplateId}`, {
				headers: {
					'x-private-key': 'MasdhaMASHF@adfn%sad',
					'x-application-name': 'AFF-APP'
				}
			})
			.then(res => {
				if (res && res.data) {
					console.log(res.data)
					setProductDetails(res.data.products)
				}
			})
			.catch(err => {
				console.log(err)
			})
	}, [product.productTemplateId])

	const openUrl = async url => {
		const isSupported = await Linking.canOpenURL(url)
		if (isSupported) {
			await Linking.openURL(url)
		} else {
			Alert.alert('Can not open this link!')
		}
	}
	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#F0F0F3' barStyle='dark-content' />
			<FlatList
				data={[1]}
				keyExtractor={(item, index) => index}
				renderItem={() => (
					<View>
						<View styles={styles.detailContainer}>
							<View style={styles.backContainer}>
								<TouchableOpacity
									onPress={() => {
										navigation.goBack('Home')
									}}>
									<Entypo name='chevron-left' style={styles.backBtn} />
								</TouchableOpacity>
							</View>
							<View style={styles.imageContainer}>
								<Image
									source={{ uri: product.thumbnail }}
									style={styles.imageProduct}
								/>
							</View>
						</View>
						<View style={styles.productDescription}>
							<View style={styles.productNameContainer}>
								<Text style={{ ...styles.productName, fontFamily: 'Nunito' }}>
									{product.productName}
								</Text>
								<TouchableOpacity
									onPress={() => {
										openUrl(products.productUrl)
									}}>
									<Ionicons name='link-outline' style={styles.linkProduct} />
								</TouchableOpacity>
							</View>
							<Text style={styles.productDescriptionText}>
								this product is so good dude
							</Text>
						</View>
						<View style={{ paddingHorizontal: 16 }}>
							<Text style={styles.productPriceText}>{formatCurrency}</Text>
						</View>
						<View style={styles.comparingBox}>
							<Text style={styles.comparingText}>So sánh giá</Text>
							<ProductCompareList
								data={productDetails}
								navigation={navigation}
							/>
						</View>
						<View style={styles.comparingBox}>
							<Text style={styles.comparingText}>Sản phẩm liên quan</Text>
							<RelatedProductList productName={relatedProductName} navigation={navigation} />
						</View>
					</View>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: '#fff',
		position: 'relative'
	},
	backContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 16,
		paddingLeft: 16
	},
	backBtn: {
		fontSize: 18,
		color: '#777777',
		padding: 12,
		backgroundColor: '#fff',
		borderRadius: 10
	},
	detailContainer: {
		width: '100%',
		backgroundColor: '#F0F0F3',
		borderBottomRightRadius: 20,
		borderBottomLeftRadius: 20,
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 4
	},
	imageContainer: {
		width,
		height: 240,
		alignItems: 'center',
		justifyContent: 'center'
	},
	imageProduct: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain'
	},
	productDescription: {
		paddingHorizontal: 16,
		marginTop: 6
	},
	productNameContainer: {
		flexDirection: 'row',
		marginVertical: 4,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	productName: {
		fontSize: 24,
		fontWeight: '600',
		letterSpacing: 0.5,
		marginVertical: 4,
		color: '#000000',
		maxWidth: '84%'
	},
	linkProduct: {
		fontSize: 24,
		color: '#0043F9',
		backgroundColor: `#0043F9${10}`,
		padding: 8,
		borderRadius: 100
	},
	productDescriptionText: {
		fontSize: 12,
		color: '#000000',
		fontWeight: '400',
		letterSpacing: 1,
		opacity: 0.5,
		lineHeight: 20,
		maxWidth: '85%',
		maxHeight: 44,
		marginBottom: 18
	},
	productPriceText: {
		fontSize: 18,
		fontWeight: '500',
		maxWidth: '85%',
		color: '#000000',
		marginBottom: 4
	},
	comparingText: {
		fontSize: 20,
		fontWeight: 'bold',
		letterSpacing: 0.5,
		marginVertical: 10,
		color: '#000000',
		marginLeft: 10
	},
	comparingBox: {
		marginVertical: 4,
		marginLeft: 3,
		justifyContent: 'space-between'
	}
})

export default ProductDetail
