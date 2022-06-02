import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { FlatList, SafeAreaView, Text, View, StyleSheet } from 'react-native'
import { API_HOST } from '../../util/API'
import { UserContext } from '../../context/UserContext'
import ProductFavouriteCard from './ProductFavouriteCard'

const ProductLikeList = ({ navigation }) => {
	const userCTX = useContext(UserContext)
	const [favouriteProducts, setFavouriteProducts] = useState([])
	const token = JSON.parse(userCTX.state.token)

	// useEffect(() => {
	//   axios
	//     .get(
	//       `${API_HOST}/api/v1/mobile/product?page=${1}&page_size=${8}`,
	//       {
	//         headers: {
	//           'x-private-key': 'MasdhaMASHF@adfn%sad',
	//           'x-application-name': 'AFF-APP'
	//         }
	//       }
	//     )
	//     .then(res => {
	//       if (res && res.data.data) {
	//         // eslint-disable-next-line no-param-reassign
	//         console.log(res.data.data)
	//         setFavouriteProducts(res.data.data)
	//       }
	//     })
	//     .catch(err => {
	//       console.log(err)
	//     })
	// }, [])

	useEffect(() => {
		axios
			.get(`${API_HOST}/api/v1/mobile/user/save-product`, {
				headers: {
					'x-private-key': 'MasdhaMASHF@adfn%sad',
					'x-application-name': 'AFF-APP',
					Authorization: `Bearer ${token}`
				}
			})
			.then(res => {
				if (res && res.data) {
					console.log(res.data)
					setFavouriteProducts(res.data.data)
				}
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View>
					<Text style={{ ...styles.title1, fontFamily: 'Montserrat' }}>
						Danh sách của bạn
					</Text>
				</View>
			</View>
			<FlatList
				contentContainerStyle={{
					marginTop: 10,
					paddingBottom: 50
				}}
				data={favouriteProducts}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => {
					return <ProductFavouriteCard product={item} navigation={navigation} />
				}}
			/>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
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
		fontWeight: 'bold',
		color: '#0AA1DD'
	}
})
export default ProductLikeList
