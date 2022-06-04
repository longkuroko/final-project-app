import React, { useContext, useState, useEffect } from 'react'
import {
	Text,
	View,
	Image,
	StyleSheet,
	TouchableOpacity,
	ToastAndroid,
	FlatList,
	ActivityIndicator
} from 'react-native'
import axios from 'axios'
import FeedCard from './FeedCard'
import { UserContext } from '../../context/UserContext'
import { API_HOST } from '../../util/API'

const MyFeedList = ({ navigation }) => {
	const userCTX = useContext(UserContext)
	const token = JSON.parse(userCTX.state.token)
	const [posts, setPosts] = useState([])
	const [nextPage, setNextPage] = useState(1)
	const [loadingMore, setLoadingMore] = useState(false)

	const getPost = async (page, size) => {
		const { data } = await axios.get(
			`${API_HOST}/api/v1/mobile/post/my-posts?page=${page}&page_size=${size}`,
			{
				headers: {
					'x-private-key': 'MasdhaMASHF@adfn%sad',
					'x-application-name': 'AFF-APP',
					Authorization: `Bearer ${token}`
				}
			}
		)
		setPosts([...posts, ...data.data])
	}
	useEffect(() => {
		getPost(1, 12)
	}, [])

	let stopLoadMore = true
	const handleOnEndReached = async () => {
		setLoadingMore(true)
		if (!stopLoadMore) {
			await getPost(nextPage + 1, 12)
			setNextPage(prevPage => prevPage + 1)
			stopLoadMore = true
		}
		setLoadingMore(false)
	}

	return (
		<View style={styles.container}>
			<FlatList
				contentContainerStyle={{
					marginTop: 10,
					paddingBottom: 50
				}}
				data={posts}
				onEndReached={handleOnEndReached}
				onEndReachedThreshold={0.5}
				onScrollBeginDrag={() => {
					stopLoadMore = false
				}}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => {
					return <FeedCard post={item} navigation={navigation} />
				}}
				ListFooterComponent={() =>
					loadingMore && <ActivityIndicator size='large' color='#1C6DD0' />
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default MyFeedList
