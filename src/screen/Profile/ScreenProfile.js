import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { Avatar, Caption, Title, TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icons from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios'
import { styles } from './ScreenProfile.style'
import { USER_ACTION, UserContext } from '../../context/UserContext'
import { API_HOST } from '../../util/API'

const ScreenProfile = ({ navigation }) => {
	const userCTX = useContext(UserContext)

	const [profile, setProfile] = useState({
		userId: null,
		username: null,
		email: null,
		avatar: null,
		phone: null,
		fullname: null,
		imgUrl: null
	})

	useEffect(() => {
		const token = JSON.parse(userCTX.state.token)
		console.log(`Bearer ${token}`)
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
					setProfile({
						username: response.data.username,
						email: response.data.email,
						phone: response.data.phoneNumber,
						fullname: response.data.fullname,
						imgUrl: response.data.imgUrl,
						userId: response.data.userId
					})
				}
			})
			.catch(err => {
				console.log(err)
			})
	}, [userCTX.state.updateUpdate])

	if (userCTX.state.token === null) {
		return (
			<View>
				<Text>U need to login</Text>
			</View>
		)
	}
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.userInfoSection}>
				<View style={{ flexDirection: 'row', marginTop: 15 }}>
					<Avatar.Image source={{ uri: profile.imgUrl }} size={80} />
					<View style={{ marginLeft: 20 }}>
						<Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
							{profile.fullName}
						</Title>
						<Caption style={styles.caption}>@{profile.username}</Caption>
					</View>
				</View>
			</View>

			<View style={styles.userInfoSection}>
				<View style={styles.row}>
					<Icon name='account' color='#777777' size={20} />
					<Text style={{ color: '#777777', marginLeft: 20 }}>
            {profile.fullname}
					</Text>
				</View>
				<View style={styles.row}>
					<Icon name='phone' color='#777777' size={20} />
					<Text style={{ color: '#777777', marginLeft: 20 }}>
						{profile.phone}
					</Text>
				</View>
				<View style={styles.row}>
					<Icon name='email' color='#777777' size={20} />
					<Text style={{ color: '#777777', marginLeft: 20 }}>
						{profile.email}
					</Text>
				</View>
			</View>

			<View style={styles.menuWrapper}>
				<TouchableRipple onPress={() => navigation.navigate('ProductLikeList')}>
					<View style={styles.menuItem}>
						<Icon name='heart-outline' color='#2980B9' size={25} />
						<Text style={styles.menuItemText}>Danh sách yêu thích</Text>
					</View>
				</TouchableRipple>
				<TouchableRipple
					onPress={() => {
						navigation.navigate('EditProfile')
					}}>
					<View style={styles.menuItem}>
						<Icon name='account-edit' color='#2980B9' size={25} />
						<Text style={styles.menuItemText}>Chỉnh sửa thông tin</Text>
					</View>
				</TouchableRipple>
				<TouchableRipple onPress={() => navigation.navigate('MyFeedList')}>
					<View style={styles.menuItem}>
						<Icons name='connected-tv' color='#2980B9' size={25} />
						<Text style={styles.menuItemText}>Bài đăng của tôi</Text>
					</View>
				</TouchableRipple>
				<TouchableRipple
					onPress={() => {
						navigation.navigate('Home')
						userCTX.logout(USER_ACTION.LOGOUT)
					}}>
					<View style={styles.menuItem}>
						<Icon name='logout' color='#2980B9' size={25} />
						<Text style={styles.menuItemText}>Đăng xuất</Text>
					</View>
				</TouchableRipple>
			</View>
		</SafeAreaView>
	)
}
export default ScreenProfile
