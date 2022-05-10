import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FlatList } from 'react-native'
import { API_HOST } from '../../util/API'
import ProductComparingCard from './productComparingCard'

const ProductCompareList = ({ data, navigation }) => {
	return (
		<FlatList
			contentContainerStyle={{
				marginTop: 10,
				paddingBottom: 50
			}}
			data={data}
			keyExtractor={(_, index) => index.toString()}
			renderItem={({ item }) => {
				return <ProductComparingCard product={item} navigation={navigation} />
			}}
		/>
	)
}

export default ProductCompareList
