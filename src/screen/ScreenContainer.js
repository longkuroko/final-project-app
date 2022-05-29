import React, { useState, ReactNode, useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Image } from 'react-native'
import ScreenHome from './Home/ScreenHome'
import ScreenLogin from './Login/ScreenLogin'
import ScreenRegister from './Login/ScreenRegister'
import ScreenProfile from './Profile/ScreenProfile'
import { UserContext } from '../context/UserContext'
import ScreenUploadImage from './ImageDetection/ScreenUploadImage'
import FeedNavigation from './Feed/FeedNavigation'
import MyComponent from './Search/SearchingScreen'
import ProductDetail from '../components/ProductDetail/ProductDetail'
import EditProfile from '../components/Profile/EditProfile'
import ProfileNavigator from './Profile/ProfileStack'

const Drawer = createDrawerNavigator()

const MainScreen = () => {
	const userCTX = useContext(UserContext)
	const { token } = userCTX.state
	if (token === null) {
		return (
			<Drawer.Navigator>
				<Drawer.Screen
					name='ScreenHome'
					component={ScreenHome}
					options={{
						title: 'Trang chủ',
						headerTitleAlign: 'center',
						drawerIcon: () => (
							<Image
								style={{ width: 20, height: 20 }}
								source={require('../../assets/home.png')}
							/>
						)
					}}
				/>
				<Drawer.Screen
					name='FeedNavigation'
					component={FeedNavigation}
					options={{
						title: 'Bảng tin',
						headerTitleAlign: 'center',
						drawerIcon: () => (
							<Image
								style={{ width: 20, height: 20 }}
								source={require('../../assets/news.png')}
							/>
						)
					}}
				/>
				<Drawer.Screen
					name='ScreenUploadImage'
					component={ScreenUploadImage}
					options={{
						title: 'Tìm kiếm bằng hình ảnh',
						headerTitleAlign: 'center',
						drawerIcon: () => (
							<Image
								style={{ width: 20, height: 20 }}
								source={require('../../assets/image.png')}
							/>
						)
					}}
				/>
				<Drawer.Screen
					name='ScreenLogin'
					component={ScreenLogin}
					options={{
						title: 'Đăng nhập',
						headerTitleAlign: 'center',
						drawerIcon: () => (
							<Image
								style={{ width: 20, height: 20 }}
								source={require('../../assets/account.png')}
							/>
						)
					}}
				/>
				<Drawer.Screen
					name='Register'
					component={ScreenRegister}
					options={{
						drawerItemStyle: {
							height: 0,
							headerTitleAlign: 'center'
						}
					}}
				/>
				<Drawer.Screen
					name='Searching'
					component={MyComponent}
					options={{
						title: 'Tìm kiếm',
						drawerItemStyle: { height: 0 },
						headerTitleAlign: 'center'
					}}
				/>
				<Drawer.Screen
					name='Detail'
					component={ProductDetail}
					options={{
						title: 'Chi tiết sản phẩm',
						drawerItemStyle: { height: 0 },
						headerTitleAlign: 'center'
					}}
				/>
			</Drawer.Navigator>
		)
	}
	return (
		<Drawer.Navigator>
			<Drawer.Screen
				name='ScreenHome'
				component={ScreenHome}
				options={{
					title: 'Trang chủ',
					headerTitleAlign: 'center',
					drawerIcon: () => (
						<Image
							style={{ width: 20, height: 20 }}
							source={require('../../assets/home.png')}
						/>
					)
				}}
			/>
			<Drawer.Screen
				name='FeedNavigation'
				component={FeedNavigation}
				options={{
					title: 'Bảng tin',
					headerTitleAlign: 'center',
					drawerIcon: () => (
						<Image
							style={{ width: 20, height: 20 }}
							source={require('../../assets/news.png')}
						/>
					)
				}}
			/>
			<Drawer.Screen
				name='ScreenUploadImage'
				component={ScreenUploadImage}
				options={{
					title: 'Tìm kiếm bằng hình ảnh',
					headerTitleAlign: 'center',
					drawerIcon: () => (
						<Image
							style={{ width: 20, height: 20 }}
							source={require('../../assets/image.png')}
						/>
					)
				}}
			/>
			<Drawer.Screen
				name='ProfileScreen'
				component={ProfileNavigator}
				options={{
					title: 'Thông tin cá nhân',
					headerTitleAlign: 'center',
					drawerIcon: () => (
						<Image
							style={{ width: 20, height: 20 }}
							source={require('../../assets/account.png')}
						/>
					)
				}}
			/>
			<Drawer.Screen
				name='Searching'
				component={MyComponent}
				options={{
					title: 'Tìm kiếm',
					drawerItemStyle: { height: 0 },
					headerTitleAlign: 'center'
				}}
			/>
			<Drawer.Screen
				name='EditProfileScreen'
				component={ProfileNavigator}
				options={{
					title: 'Chỉnh sửa thông tin',
					drawerItemStyle: { height: 0 },
					headerTitleAlign: 'center'
				}}
			/>
      <Drawer.Screen
        name='Detail'
        component={ProductDetail}
        options={{
          title: 'Chi tiết sản phẩm',
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center'
        }}
      />
		</Drawer.Navigator>
	)
}

export default MainScreen
