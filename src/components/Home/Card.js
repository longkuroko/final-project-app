import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import { useFonts } from 'expo-font'
import { styles } from '../../screen/Home/ScreenHome.style'
import 'intl';
import 'intl/locale-data/jsonp/fr';

const Card = ({ product, navigation }) => {
	useFonts({
		// eslint-disable-next-line global-require
		Nunito: require('../../../assets/fonts/Nunito-Black.ttf')
	})
  const formatCurrency =new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={() => navigation.navigate('Detail', product)}>
			<View style={styles.card}>
				<View
					style={{
						height: 100,
						alignItems: 'center'
					}}>
					<Image
						source={{ uri: product.thumbnail }}
						style={{ flex: 1, resizeMode: 'contain', height: 100, width: 150 }}
					/>
				</View>
				<Text style={styles.plantName}>{product.productName}</Text>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 5
					}}>
					<Text style={styles.plantPrice}>{formatCurrency}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default Card
