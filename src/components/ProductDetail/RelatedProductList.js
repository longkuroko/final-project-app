import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import axios from 'axios'
import { API_HOST } from '../../util/API'
import Card from '../Home/Card'

const RelatedProductList = ({ navigation }) => {
	const [relativeProducts, setRelativeProduct] = useState([])
	useEffect(() => {
		axios
			.get(`${API_HOST}/api/v1/mobile/product?page=${1}&page_size=${4}`, {
				headers: {
					'x-private-key': 'MasdhaMASHF@adfn%sad',
					'x-application-name': 'AFF-APP'
				}
			})
			.then(res => {
				if (res && res.data.data) {
					// eslint-disable-next-line no-param-reassign
					console.log(res.data.data)
					setRelativeProduct(res.data.data)
				}
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	return (
		<FlatList
			horizontal
			data={relativeProducts}
			bouncesZoom
			decelerationRate={0}
			keyExtractor={(_, index) => index.toString()}
			scrollEventThrottle={16}
			renderItem={({ item }) => {
				return <Card product={item} navigation={navigation} />
			}}
		/>
	)
}

export default RelatedProductList
