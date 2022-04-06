import React, { useState, ReactNode } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { View, Image } from 'react-native'
import ScreenHome from './Home/ScreenHome'
import ScreenLogin from './Login/ScreenLogin'
import ScreenRegister from './Login/ScreenRegister'
import ScreenDetail from './Detail/ScreenDetail'
import ScreenProfile from './Profile/ScreenProfile'

const Drawer = createDrawerNavigator()

const MainScreen = () => {
	return (
		<Drawer.Navigator>
			<Drawer.Screen
				name='Home'
				component={ScreenHome}
				options={{
					title: 'Home',
					drawerIcon: () => (
						<Image
							style={{ width: 20, height: 20 }}
							source={require('../../assets/home.png')}
						/>
					)
				}}
			/>
			<Drawer.Screen
				name='ScreenLogin'
				component={ScreenLogin}
				options={{
					title: 'account',
					drawerIcon: () => (
						<Image
							style={{ width: 20, height: 20 }}
							source={require('../../assets/account.png')}
						/>
					)
				}}
			/>
			<Drawer.Screen name='ScreenRegister' component={ScreenRegister} />
			<Drawer.Screen name='Profile' component={ScreenProfile} />
			<Drawer.Screen name='Details' component={ScreenDetail} />
		</Drawer.Navigator>
	)
}

export default MainScreen
