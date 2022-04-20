import React, { useContext } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { UserContext } from '../../context/UserContext'
import { styles } from '../../screen/Home/ScreenHome.style'

const ProductDetail = ({ navigation, route }) => {
	const product = route.params

	const userCTX = useContext(UserContext)

	console.log(userCTX.state.token)

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: '#fff'
			}}>
			<View style={styles.headerDetail}>
				<Icon name='arrow-back' size={28} onPress={() => navigation.goBack()} />
			</View>
			<View style={styles.imageContainer}>
				<Image source={product.thumbnail} style={{ resizeMode: 'contain', flex: 1 }} />
			</View>
			<View style={styles.detailsContainer}>
				<View
					style={{
						marginLeft: 20,
						flexDirection: 'row',
						alignItems: 'flex-end'
					}}>
				</View>
				<View
					style={{
						marginLeft: 20,
						marginTop: 20,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}>
					<Text style={{ fontSize: 18, fontWeight: 'bold' }}>{product.productName}</Text>
					<View style={styles.priceTag}>
						<Text
							style={{
								marginLeft: 15,
								color: '#fff',
								fontWeight: 'bold',
								fontSize: 16
							}}>
							${product.price}
						</Text>
					</View>
				</View>
				<View style={{ paddingHorizontal: 20, marginTop: 10 }}>
					<Text style={{ fontSize: 20, fontWeight: 'bold' }}>About</Text>
					<Text
						style={{
							color: 'grey',
							fontSize: 16,
							lineHeight: 22,
							marginTop: 10
						}}>
					</Text>
					<View
						style={{
							marginTop: 20,
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}
export default ProductDetail
