import React, {useState, ReactNode, useContext} from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Image } from 'react-native'
import ScreenHome from './Home/ScreenHome'
import ScreenLogin from './Login/ScreenLogin'
import ScreenRegister from './Login/ScreenRegister'
import ScreenProfile from './Profile/ScreenProfile'
import {UserContext} from "../context/UserContext";
import ScreenUploadImage from "./ImageDetection/ScreenUploadImage";
import FeedNavigation from "./Feed/FeedNavigation";

const Drawer = createDrawerNavigator()

const MainScreen = () => {
  const userCTX = useContext(UserContext);
  const {token} = userCTX.state
  if (token === null) {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          name='ScreenHome'
          component={ScreenHome}
          options={{
            title: 'Trang chủ',
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
          component={ScreenRegister} />
      </Drawer.Navigator>
    )
  }
	return (
		<Drawer.Navigator>
			<Drawer.Screen
				name='Home'
				component={ScreenHome}
				options={{
					title: 'Trang chủ',
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
          drawerIcon: () => (
            <Image
              style={{ width: 20, height: 20 }}
              source={require('../../assets/image.png')}
            />
          )
        }}
      />
        <Drawer.Screen
          name='Thông tin cá nhân'
          component={ScreenProfile}
          options={{
            title: 'Profile',
            drawerIcon: () => (
              <Image
                style={{ width: 20, height: 20 }}
                source={require('../../assets/account.png')}
              />
            )
          }}
      />
		</Drawer.Navigator>
	)
}

export default MainScreen
