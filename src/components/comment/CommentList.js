import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FlatList } from 'react-native'
import { API_HOST } from '../../util/API'
import Comment from './Comment'

const CommentList = ({ productId, navigation }) => {
	const [comments, setComments] = useState([])

	useEffect(() => {
		axios
			.get(`${API_HOST}/api/v1/mobile/comment/ecommerce-product/${productId}`, {
				headers: {
					'x-private-key': 'MasdhaMASHF@adfn%sad',
					'x-application-name': 'AFF-APP'
				}
			})
			.then(res => {
				if (res && res.data) {
					console.log(res.data)
					setComments(res.data)
				}
			})
			.catch(err => {
				console.log(err)
			})
	}, [productId])

	return (
		<FlatList
			nestedScrollEnabled
			contentContainerStyle={{
				marginTop: 10,
				paddingBottom: 50
			}}
			data={comments}
			keyExtractor={(_, index) => index.toString()}
			listKey={(_, index) => index.toString()}
			renderItem={({ item }) => {
				return <Comment comment={item} navigation={navigation} />
			}}
		/>
	)
}

export default CommentList
