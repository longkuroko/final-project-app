import React, { createRef, useContext, useEffect, useState } from 'react'
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Text,
	TextInput,
	ImageBackground,
	Keyboard,
	ToastAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'
import { useTheme } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import { API_HOST } from '../../util/API'
import { USER_ACTION, UserContext } from '../../context/UserContext'

const EditProfile = ({ navigation }) => {
	const userCTX = useContext(UserContext)
	const token = JSON.parse(userCTX.state.token)
	const [hasGallaryPermission, setHasGallaryPermission] = useState(null)
	const [updateProfile, setUpdateProfile] = useState({
		username: null,
		fullname: null,
		email: null,
		phoneNumber: null,
		imgUrl: null
	})
	const { colors } = useTheme()
	const bs = createRef()
	const fall = new Animated.Value(1)

	useEffect(() => {
		;(async () => {
			const galleryStatus =
				await ImagePicker.requestMediaLibraryPermissionsAsync()
			setHasGallaryPermission(galleryStatus.status === 'granted')
		})()
	}, [token])

	useEffect(() => {
		axios
			.get(`${API_HOST}/api/v1/auth/profile`, {
				headers: {
					'x-private-key': 'MasdhaMASHF@adfn%sad',
					'x-application-name': 'AFF-APP',
					Authorization: `Bearer ${token}`
				}
			})
			.then(response => {
				if (response && response.data) {
					console.log(response.data)
					// eslint-disable-next-line no-unused-expressions
					setUpdateProfile({
						username: response.data.username,
						email: response.data.email,
						phone: response.data.phoneNumber,
						fullname: response.data.fullname,
						imgUrl: response.data.imgUrl
					})
				}
			})
			.catch(err => {
				console.log(err)
			})
	}, [token])

	const pickImage = async () => {
		const images = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		})

		console.log(images)
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
				setUpdateProfile({
					...updateProfile,
					imgUrl: data.url
				})
			})
	}

	const updateData = user => {
		console.log(`Bearer ${token}`)
		Keyboard.dismiss()
		axios
			.put(`${API_HOST}/api/v1/profile/update`, user, {
				headers: {
					'x-private-key': 'MasdhaMASHF@adfn%sad',
					'x-application-name': 'AFF-APP',
					Authorization: `Bearer ${token}`
				}
			})
			.then(res => {
				console.log(res.data)
				ToastAndroid.show('Cập nhập thành công!', ToastAndroid.SHORT)
				navigation.navigate('ScreenProfile')
				userCTX.updateProfile(USER_ACTION.UPDATE_PROFILE)
			})
			.catch(err => {
				ToastAndroid.show('Cập nhật thất bại!', ToastAndroid.SHORT)
				console.log(err)
			})
	}

	const renderInner = () => (
		<View style={styles.panel}>
			<View style={{ alignItems: 'center' }}>
				<Text style={styles.panelTitle}>Upload Photo</Text>
				<Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
			</View>
			<TouchableOpacity style={styles.panelButton}>
				<Text style={styles.panelButtonTitle}>Take Photo</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.panelButton}>
				<Text style={styles.panelButtonTitle}>Choose From Library</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.panelButton}
				onPress={() => bs.current.snapTo(1)}>
				<Text style={styles.panelButtonTitle}>Cancel</Text>
			</TouchableOpacity>
		</View>
	)

	const renderHeader = () => (
		<View style={styles.header}>
			<View style={styles.panelHeader}>
				<View style={styles.panelHandle} />
			</View>
		</View>
	)

	return (
		<View style={styles.container}>
			<BottomSheet
				ref={bs}
				snapPoints={[330, 0]}
				renderContent={renderInner}
				renderHeader={renderHeader}
				initialSnap={1}
				callbackNode={fall}
				enabledGestureInteraction
			/>
			<Animated.View
				style={{
					margin: 20,
					opacity: Animated.add(0.1, Animated.multiply(fall, 1.0))
				}}>
				<View style={{ alignItems: 'center' }}>
					<TouchableOpacity onPress={() => pickImage()}>
						<View style={styles.imageContainer}>
							<ImageBackground
								source={{ uri: updateProfile.imgUrl }}
								style={{ height: 100, width: 100 }}
								imageStyle={{ borderRadius: 15 }}>
								<View style={styles.imageView}>
									<Icon
										name='camera'
										size={35}
										color='#fff'
										style={styles.imageIcon}
									/>
								</View>
							</ImageBackground>
						</View>
					</TouchableOpacity>
					<Text style={styles.textName}>{updateProfile.username}</Text>
				</View>

				<View style={styles.action}>
					<FontAwesome name='user-o' color={colors.text} size={20} />
					<TextInput
						placeholder='Họ và tên'
						placeholderTextColor='#666666'
						autoCorrect={false}
						style={styles.textInput}
						value={updateProfile.fullname}
						onChangeText={fullname => {
							setUpdateProfile({ ...updateProfile, fullname })
						}}
					/>
				</View>

				<View style={styles.action}>
					<FontAwesome name='envelope-o' color={colors.text} size={20} />
					<TextInput
						placeholder='Email'
						placeholderTextColor='#666666'
						keyboardType='email-address'
						autoCorrect={false}
						style={styles.textInput}
						value={updateProfile.email}
						onChangeText={email => {
							setUpdateProfile({ ...updateProfile, email })
						}}
					/>
				</View>

				<View style={styles.action}>
					<Feather name='phone' color={colors.text} size={20} />
					<TextInput
						placeholder='Phone'
						placeholderTextColor='#666666'
						keyboardType='number-pad'
						autoCorrect={false}
						style={styles.textInput}
						value={updateProfile.phone}
						onChangeText={phone => {
							setUpdateProfile({ ...updateProfile, phone })
						}}
					/>
				</View>
				<TouchableOpacity
					style={styles.commandButton}
					onPress={() => updateData(updateProfile)}>
					<Text style={styles.panelButtonTitle}>Submit</Text>
				</TouchableOpacity>
			</Animated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	panel: {
		padding: 20,
		backgroundColor: '#ffffff',
		paddingTop: 20
	},
	panelHeader: {
		alignItems: 'center'
	},
	panelHandle: {
		width: 40,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#00000040',
		marginBottom: 10
	},
	panelTitle: {
		fontSize: 27,
		height: 35
	},
	panelSubtitle: {
		fontSize: 14,
		color: 'gray',
		height: 30,
		marginBottom: 10
	},
	header: {
		backgroundColor: '#FFFFFF',
		shadowColor: '#333333',
		shadowOffset: { width: -1, height: -3 },
		shadowRadius: 2,
		shadowOpacity: 0.4,
		paddingTop: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
	},
	imageContainer: {
		height: 100,
		width: 100,
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageIcon: {
		opacity: 0.7,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#fff',
		borderRadius: 10
	},
	textName: {
		marginTop: 10,
		fontSize: 18,
		fontWeight: 'bold'
	},
	action: {
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 5
	},
	textInput: {
		flex: 1,
		paddingLeft: 10,
		color: '#05375a'
	},
	commandButton: {
		padding: 15,
		borderRadius: 10,
		backgroundColor: '#FF6347',
		alignItems: 'center',
		marginTop: 10
	},
	panelButtonTitle: {
		fontSize: 17,
		fontWeight: 'bold',
		color: 'white'
	},
	panelButton: {
		padding: 13,
		borderRadius: 10,
		backgroundColor: '#FF6347',
		alignItems: 'center',
		marginVertical: 7
	}
})

export default EditProfile
