import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, View, Image, Text } from 'react-native'
import { Avatar, Caption, Title, TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from './ScreenProfile.style'
import { USER_ACTION, UserContext } from '../../context/UserContext'
import { getProfile } from '../../API/Profile/ProfileAPI'
import axios from "axios";
import {API_HOST} from "../../util/API";

const ScreenProfile = ({ navigation }) => {
  const userCTX = useContext(UserContext)

  const [profile, setProfile] = useState({
    username: null,
    email: null,
    avatar: null,
    phone: null,
    fullName: null
  })

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('token')
    }catch (e) {

    }
  }

	useEffect(() => {
    const token = getToken()
    console.log(token)
    axios.get(`${API_HOST}/api/v1/auth/profile`, {
      headers: {
        'x-private-key': 'MasdhaMASHF@adfn%sad',
        'x-application-name': 'AFF-APP',
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      if (res && res.data) {
        setProfile({
          username: res.data.username,
          email: res.data.email,
          phone: res.data.phoneNumber,
          fullName: res.data.fullName
        })
      }
    }).catch(err => {
      console.log(err)
    })
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.userInfoSection}>
				<View style={{ flexDirection: 'row', marginTop: 15 }}>
					<Avatar.Image
						source={require('../../../assets/account.png')}
						size={80}
					/>
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
					<Icon name='map-marker-radius' color='#777777' size={20} />
					<Text style={{ color: '#777777', marginLeft: 20 }}>
						Ho Chi Minh, Vietnam
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
				<TouchableRipple onPress={() => {}}>
					<View style={styles.menuItem}>
						<Icon name='heart-outline' color='#2980B9' size={25} />
						<Text style={styles.menuItemText}>Your Favorites</Text>
					</View>
				</TouchableRipple>
				<TouchableRipple onPress={() => {}}>
					<View style={styles.menuItem}>
						<Icon name='account-check-outline' color='#2980B9' size={25} />
						<Text style={styles.menuItemText}>Support</Text>
					</View>
				</TouchableRipple>
				<TouchableRipple onPress={() => {}}>
					<View style={styles.menuItem}>
						<Icon name='settings' color='#2980B9' size={25} />
						<Text style={styles.menuItemText}>Settings</Text>
					</View>
				</TouchableRipple>
				<TouchableRipple
					onPress={() => {
						navigation.navigate('Home')
						userCTX.logout(USER_ACTION.LOGOUT)
					}}>
					<View style={styles.menuItem}>
						<Icon name='logout' color='#2980B9' size={25} />
						<Text style={styles.menuItemText}>Log out</Text>
					</View>
				</TouchableRipple>
			</View>
		</SafeAreaView>
	)
}
export default ScreenProfile
