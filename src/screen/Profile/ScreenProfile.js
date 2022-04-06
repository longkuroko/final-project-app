import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, View, Image, Text } from 'react-native'
import { Avatar, Caption, Title, TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from './ScreenProfile.style'

const ScreenProfile = () => {
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
							Nguyen Thanh Long
						</Title>
						<Caption style={styles.caption}>@Longxoan</Caption>
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
						039 356 4087
					</Text>
				</View>
				<View style={styles.row}>
					<Icon name='email' color='#777777' size={20} />
					<Text style={{ color: '#777777', marginLeft: 20 }}>
						onlylongxoan@gmail.com
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
						<Icon name='settings-sharp' color='#2980B9' size={25} />
						<Text style={styles.menuItemText}>Settings</Text>
					</View>
				</TouchableRipple>
        <TouchableRipple onPress={() => {}}>
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
