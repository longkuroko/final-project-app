import React, { useEffect, useState } from 'react'
import {
	Image,
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
import CommentList from "../comment/CommentList";

const { width } = Dimensions.get('window')
const ProductDetail = ({ navigation, route }) => {
	const product = route.params
	const [productDetails, setProductDetails] = useState([])
  const relatedProductName = product.productName.slice(0, 15);
  const [variants, setVariants] = useState([])
  const [productIndex, setProductIndex] = useState({
    productId: null,
    thumbnail: null,
    name: null,
    originalUrl: null,
    description: null,
    listPrice: null,
    salePrice: null,
    color: null
  })

	const formatCurrency = new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND'
	}).format(productIndex.listPrice)

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
					setProductDetails(res.data.items)
          setVariants(res.data.items[0].variants)
          setProductIndex({
            thumbnail: res.data.items[0].thumbnail,
            name: res.data.items[0].name,
            originalUrl: res.data.items[0].originalUrl,
            description: res.data.items[0].description,
            listPrice: res.data.items[0].variants[0].listPrice,
            color: res.data.items[0].variants[0].variantName,
            productId: res.data.items[0].productId
          })
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

  const updatePriceForProduct = variant => {
    setProductIndex({
      ...productIndex,
      thumbnail: variant.variantImageUrl,
      listPrice: variant.listPrice,
      color: variant.variantName
    })
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
									source={{ uri: productIndex.thumbnail }}
									style={styles.imageProduct}
								/>
							</View>
						</View>
						<View style={styles.productDescription}>
							<View style={styles.productNameContainer}>
								<Text style={{ ...styles.productName, fontFamily: 'Nunito' }}>
									{productIndex.name}
								</Text>
								<TouchableOpacity
									onPress={() => {
										openUrl(productIndex.originalUrl)
									}}>
									<Ionicons name='link-outline' style={styles.linkProduct} />
								</TouchableOpacity>
							</View>
							<Text style={styles.productDescriptionText}>
								{productIndex.description}
							</Text>
						</View>
            <View style={{ paddingHorizontal: 16 }}>
              <Text style={styles.productPriceText}>Màu: {productIndex.color}</Text>
            </View>
						<View style={{ paddingHorizontal: 16 }}>
							<Text style={styles.productPriceText}>{formatCurrency}</Text>
						</View>
            <View style={styles.comparingBox}>
              <Text style={styles.comparingText}>Lựa chọn</Text>
              <FlatList
                nestedScrollEnabled
                horizontal
                data={variants}
                bouncesZoom
                decelerationRate={0}
                keyExtractor={(_, index) => index.toString()}
                scrollEventThrottle={16}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => updatePriceForProduct(item)}>
                    <View style={styles.variantContainer} >
                      <View
                        style={{
                          height: 100,
                          alignItems: 'center'
                        }}>
                        <Image
                          source={{ uri: item.variantImageUrl }}
                          style={{ flex: 1, resizeMode: 'contain', height: 100, width: 150 }}
                        />
                      </View>
                      <Text style={styles.variantNameText}>{item.variantName}</Text>
                    </View>
                  </TouchableOpacity>)
                }}
              />
            </View>
						<View style={styles.comparingBox}>
							<Text style={styles.comparingText}>So sánh giá</Text>
							<ProductCompareList
								data={productDetails}
								navigation={navigation}
                variantPrice={formatCurrency}
							/>
						</View>
            <View style={styles.comparingBox}>
              <Text style={styles.comparingText}>Nhận xét về sản phẩm</Text>
              <CommentList productId={productIndex.productId} navigation={navigation}/>
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
	},
  variantContainer: {
    margin: 8,
    width: 120,
    height: 120,
    borderRadius: 10,
    elevation: 20,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: '#333',
    backgroundColor: '#fff',
    alignItems: "center"
  },
  variantImage: {
    width: '30%',
    height: 100,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  variantNameText: {
    fontSize: 14,
    maxWidth: '100%',
    color: '#000000',
    fontWeight: '600',
    letterSpacing: 1
  }
})

export default ProductDetail
