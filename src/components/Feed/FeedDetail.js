import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
	TextInput,
	FlatList,
	ToastAndroid,
	Alert
} from 'react-native'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Entypo'
import Icons from 'react-native-vector-icons/AntDesign'
import PostComment from './PostComment'
import { API_HOST } from '../../util/API'
import { UserContext } from '../../context/UserContext'

const FeedDetail = ({ route, navigation }) => {
	const [isMyPost, setIsMyPost] = useState(true)
	const post = route.params
	const id = post.postId
	const userCTX = useContext(UserContext)
	const token = JSON.parse(userCTX.state.token)
	const { userId } = userCTX.state
	const [comments, setComments] = useState([])
	const [comment, setComment] = useState({
		postId: id,
		content: ''
	})
	const [isLike, setIsLike] = useState(false)
	const handleLike = () => {
		if (isLike) {
			setIsLike(false)
		} else {
			setIsLike(true)
		}
	}
	if (userId === post.author.userId) {
		setIsMyPost(true)
		setIsLoading(true)
	}
	const [isLoading, setIsLoading] = useState(false)
	// call api to get comment
	const getComments = async postId => {
		axios
			.get(`${API_HOST}/api/v1/mobile/post/${postId}/comment`, {
				headers: {
					'x-private-key': 'MasdhaMASHF@adfn%sad',
					'x-application-name': 'AFF-APP'
				}
			})
			.then(res => {
				if (res && res.data) {
					console.log(res.data)
					setComments(res.data.data)
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	useEffect(() => {
		getComments(post.postId)
		console.log(post.author.userId)
	}, [isLoading])

	// eslint-disable-next-line no-shadow
	const postComment = comment => {
		if (token === null) {
			ToastAndroid.show(
				'Bạn cần đăng nhập để thực chức năng này!',
				ToastAndroid.SHORT
			)
		} else {
			setIsLoading(true)
			axios
				.post(`${API_HOST}/api/v1/mobile/post/comment`, comment, {
					headers: {
						'x-private-key': 'MasdhaMASHF@adfn%sad',
						'x-application-name': 'AFF-APP',
						Authorization: `Bearer ${token}`
					}
				})
				.then(res => {
					if (res) {
						ToastAndroid.show('Thành công!', ToastAndroid.SHORT)
						setIsLoading(false)
					}
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
	const clearCommentInputAfterCreate = () =>
		setComment({ ...comment, content: '' })

	const handleDelete = postId => {
		Alert.alert(
			'Xóa bài viết',
			'Bạn có chắc muốn xóa bài viết',
			[
				{
					text: 'Không',
					onPress: () => console.log('Cancel Pressed!'),
					style: 'cancel'
				},
				{
					text: 'Có',
					onPress: () => deletePost(postId)
				}
			],
			{ cancelable: false }
		)
	}

	const deletePost = postId => {
		axios
			.delete(`${API_HOST}/api/v1/mobile/post/${postId}`, {
				headers: {
					'x-private-key': 'MasdhaMASHF@adfn%sad',
					'x-application-name': 'AFF-APP',
					Authorization: `Bearer ${token}`
				}
			})
			.then(res => {
				if (res && res.data.status === 200) {
					ToastAndroid.show('Xóa Thành công!', ToastAndroid.SHORT)
					navigation.navigate('Feed')
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<View>
			<View>
				<FlatList
					data={[1]}
					keyExtractor={(item, index) => index}
					renderItem={() => (
						<View style={styles.container}>
							<View style={styles.cardContainer}>
								<Image
									source={{
										uri: 'https://organicthemes.com/demo/profile/files/2018/05/profile-pic.jpg'
									}}
									style={{ height: 50, width: 50, borderRadius: 50 }}
								/>
								<View style={{ marginLeft: 10 }}>
									<Text style={{ fontSize: 20 }}>{post.author.username}</Text>
									<View style={{ flexDirection: 'row' }}>
										<Text style={{ fontSize: 12 }}>
											{new Date(post.createdAt).toString().substring(0, 16)}
										</Text>
										<Text style={{ fontSize: 12, marginLeft: 5 }}>{`${new Date(
											post.createdAt
										).getHours()} : ${new Date(
											post.createdAt
										).getMinutes()}`}</Text>
									</View>
								</View>
								<View style={{ marginLeft: 150 }}>
									<Icon name='dots-three-vertical' size={20} color='#000000' />
								</View>
							</View>
							<Image
								source={{ uri: post.postThumbnail }}
								style={{ height: 200, width: '100%' }}
							/>
							<Text style={styles.textContent}>{post.postTitle}</Text>
							<View
								style={{ height: 1, width: '100%', backgroundColor: '#3333' }}
							/>
							<View style={{ flexDirection: 'row' }}>
								<TouchableOpacity
									style={{ flex: 1, margin: 10 }}
									onPress={() => handleLike()}>
									<Icons
										name='like2'
										style={{
											textAlign: 'center',
											fontWeight: 'bold',
											fontSize: 20,
											color: isLike === true ? '#398AB9' : '#000000'
										}}
									/>
								</TouchableOpacity>
								{isMyPost === true ? (
									<TouchableOpacity
										style={{ flex: 1, margin: 10 }}
										onPress={() => navigation.navigate('UpdateFeed', post)}>
										<Icon
											name='edit'
											style={{
												textAlign: 'center',
												fontWeight: 'bold',
												fontSize: 20
											}}
										/>
									</TouchableOpacity>
								) : null}
								{isMyPost === true ? (
									<TouchableOpacity
										style={{ flex: 1, margin: 10 }}
										onPress={() => handleDelete(post.postId)}>
										<Icons
											name='delete'
											style={{
												textAlign: 'center',
												fontWeight: 'bold',
												fontSize: 20
											}}
										/>
									</TouchableOpacity>
								) : null}
								<View
									style={{ backgroundColor: '#3333', height: '100%', width: 1 }}
								/>
							</View>
							<FlatList
								nestedScrollEnabled
								contentContainerStyle={{
									marginTop: 10,
									paddingBottom: 50
								}}
								data={comments}
								keyExtractor={(_, index) => index.toString()}
								renderItem={({ item }) => {
									return <PostComment comment={item} navigation={navigation} />
								}}
							/>
						</View>
					)}
				/>
			</View>
			<KeyboardAvoidingView behavior='padding' style={styles.writeComment}>
				<TextInput
					style={styles.input}
					value={comment.content}
					onChangeText={content => setComment({ ...comment, content })}
				/>
				<TouchableOpacity
					onPress={() => {
						postComment(comment)
						// eslint-disable-next-line no-unused-expressions
						clearCommentInputAfterCreate()
					}}>
					<View style={styles.addWrapper}>
						<Text>+</Text>
					</View>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		margin: 10,
		borderRadius: 7,
		elevation: 5,
		shadowColor: '#333',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		zIndex: -1
	},
	cardContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10
	},
	textContent: {
		margin: 10,
		color: '#333',
		fontSize: 12,
		marginTop: 5
	},
	writeComment: {
		position: 'absolute',
		width: '100%',
		top: 520,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	addWrapper: {
		width: 60,
		height: 60,
		backgroundColor: '#FFF',
		borderRadius: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#C0C0C0',
		borderWidth: 1
	},
	input: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		backgroundColor: '#FFF',
		borderRadius: 20,
		borderColor: '#C0C0C0',
		borderWidth: 1,
		width: 270
	}
})

export default FeedDetail
