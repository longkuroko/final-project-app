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
import MaterialIcon from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import FeedCard from './FeedCard'
import { UserContext } from '../../context/UserContext'
import { API_HOST } from '../../util/API'

const Feed = ({ navigation }) => {
	const userCTX = useContext(UserContext)
	const { token } = userCTX.state
	const [posts, setPosts] = useState([])
	const [nextPage, setNextPage] = useState(1)
	const [loadingMore, setLoadingMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

	const getPost = async (page, size) => {
		const { data } = await axios.get(
			`${API_HOST}/api/v1/mobile/post?page=${page}&page_size=${size}`,
			{
				headers: {
					'x-private-key': 'MasdhaMASHF@adfn%sad',
					'x-application-name': 'AFF-APP'
				}
			}
		)
		setPosts([...posts, ...data.data])
	}
	useEffect(() => {
		getPost(1, 12)
	}, [isLoading])

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

	const checkIsLogin = () => {
		if (token === null) {
			ToastAndroid.show(
				'Bạn cần đăng nhập để thực chức năng này!',
				ToastAndroid.SHORT
			)
		} else {
			navigation.navigate('CreateFeed')
		}
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
			<TouchableOpacity
				onPress={() => checkIsLogin()}
				style={{
					position: 'absolute',
					right: 60,
					bottom: 60,
					backgroundColor: '#39A2DB',
					borderRadius: 30
				}}>
				<MaterialIcon
					name='plus'
					color='white'
					size={15}
					style={{ margin: 20 }}
				/>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
export default Feed
