import React, { useContext, useEffect, useState } from 'react'
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
	ImageBackground,
	TextInput,
	ToastAndroid
} from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import * as ImagePicker from 'expo-image-picker'

import axios from 'axios'
import { UserContext } from '../../context/UserContext'
import { API_HOST } from '../../util/API'

const EditPost = ({ route, navigation }) => {
	const feed = route.params
	const userCTX = useContext(UserContext)
	const token = JSON.parse(userCTX.state.token)
	const [image, setImage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [editPost, setEditPost] = useState({
		postId: feed.postId,
		postTitle: feed.postTitle,
		postThumbnail: feed.postThumbnail,
		postContent: feed.postContent,
		postType: 'tips'
	})

	const [hasGallaryPermission, setHasGallaryPermission] = useState(null)

	useEffect(() => {
		;(async () => {
			const galleryStatus =
				await ImagePicker.requestMediaLibraryPermissionsAsync()
			setHasGallaryPermission(galleryStatus.status === 'granted')
		})()
	}, [feed.postId])

	const pickImage = async () => {
		const images = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		})

		if (!images.cancelled) {
			const newFile = {
				uri: images.uri,
				type: `test/${images.uri.split('.')[1]}`,
				name: `test.${images.uri.split('.')[1]}`
			}
			handleUpload(newFile)
		}
	}

	if (hasGallaryPermission === false) {
		return <Text>No access to Gallery</Text>
	}

	// eslint-disable-next-line no-shadow
	const handleUpload = image => {
		// eslint-disable-next-line no-undef
		const data = new FormData()
		data.append('file', image)
		data.append('upload_preset', '_affservice')
		data.append('cloud_name', 'ditcowo2b')

		// eslint-disable-next-line no-undef
		fetch('https://api.cloudinary.com/v1_1/ditcowo2b/image/upload', {
			method: 'post',
			body: data
		})
			.then(res => res.json())
			// eslint-disable-next-line no-shadow
			.then(data => {
				setImage(data.url)
				setEditPost({
					...editPost,
					postThumbnail: data.url
				})
			})
	}

  const getPostDetail = (postId) => {
      axios.get(`${API_HOST}/api/v1/mobile/post/detail/${postId}`, {
        headers: {
          'x-private-key': 'MasdhaMASHF@adfn%sad',
          'x-application-name': 'AFF-APP',
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        if (res && res.data) {
          console.log(res.data);
          setEditPost({
            postId: res.data.postId,
            postTitle: res.data.postTitle,
            postThumbnail: res.data.postThumbnail,
            postContent: res.data.postContent,
            ...editPost
          })
        }
      }).catch(err => console.log(err))
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   getPostDetail(feed.postId)
  // },[feed.postId])


	const updatePost = post => {
		axios
			.put(`${API_HOST}/api/v1/mobile/post`, post, {
				headers: {
					'x-private-key': 'MasdhaMASHF@adfn%sad',
					'x-application-name': 'AFF-APP',
					Authorization: `Bearer ${token}`
				}
			})
			.then(res => {
				if (res && res.data.status === 200) {
					ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT)
					navigation.navigate('FeedNavigation')
				}
			})
			.catch(err => {
				ToastAndroid.show('Đăng bài thất bại!', ToastAndroid.SHORT)
				console.log(err)
			})
	}

	return (
		<View style={styles.container}>
			<View style={styles.backContainer}>
				<TouchableOpacity onPress={() => navigation.goBack('Feed')}>
					<Entypo name='chevron-left' style={styles.backBtn} />
				</TouchableOpacity>
			</View>
			{isLoading ? (
				<ActivityIndicator
					size='large'
					color='#f66'
					style={styles.activityIndicator}
				/>
			) : null}
			{image === '' ? (
				<TouchableOpacity onPress={() => pickImage()} style={styles.imageBox}>
					<AntIcon name='pluscircleo' color='white' size={80} />
					<Text style={{ fontSize: 20, marginTop: 5, color: 'white' }}>
						Add Image
					</Text>
				</TouchableOpacity>
			) : (
				<ImageBackground
					source={{ uri: editPost.postThumbnail }}
					style={{ height: 200, alignItems: 'flex-end' }}>
					<TouchableOpacity
						onPress={() => setImage('')}
						style={{ padding: 10 }}>
						<Entypo name='circle-with-cross' color='white' size={30} />
					</TouchableOpacity>
				</ImageBackground>
			)}
			<View style={{ marginVertical: 5, margin: 5 }}>
				<Text style={{ fontSize: 20, fontWeight: '500' }}>Tiêu đề</Text>
				<TextInput
					style={styles.textInputContent}
					placeholder='Nhập tiêu đề...'
					value={editPost.postTitle}
					onChangeText={postTitle => {
						setEditPost({ ...editPost, postTitle })
					}}
				/>
			</View>
			<View style={{ marginVertical: 5, margin: 5 }}>
				<Text style={{ fontSize: 20, fontWeight: '500' }}>Nội dung</Text>
				<TextInput
					style={styles.textInputContent}
					placeholder='Nhập nội dụng...'
					value={editPost.postContent}
					onChangeText={postContent => {
						setEditPost({ ...editPost, postContent })
					}}
				/>
			</View>
			<TouchableOpacity
				style={styles.postButton}
				onPress={() => updatePost(editPost)}>
				<Text style={styles.postText}>Cập nhật</Text>
			</TouchableOpacity>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		position: 'relative'
	},
	textInputContent: {
		color: '#333',
		textAlignVertical: 'top',
		padding: 10
	},
	postText: {
		color: 'white',
		margin: 15,
		fontSize: 20,
		textAlign: 'center'
	},
	postButton: {
		backgroundColor: '#2980B9',
		margin: 10,
		marginVertical: 10,
		borderRadius: 10,
		top: 30
	},
	activityIndicator: {
		position: 'absolute',
		top: '45%',
		left: '45%'
	},
	imageBox: {
		backgroundColor: '#aaa3',
		justifyContent: 'center',
		alignItems: 'center',
		height: 200
	},
	backContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 16,
		paddingLeft: 16
	}
})
export default EditPost
