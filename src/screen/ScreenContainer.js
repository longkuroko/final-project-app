import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ScreenA from './screenA/ScreenA'
import ScreenB from './screenB/ScreenB'
import ScreenHome from './Home/ScreenHome'

const Drawer = createDrawerNavigator()

const MainScreen = () => {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name='ScreenA' component={ScreenA}  />
			<Drawer.Screen name='ScreenB' component={ScreenB} />
      <Drawer.Screen name='Home' component={ScreenHome}  options={{ title: 'Màn hình trang chủ' }}  />
		</Drawer.Navigator>
	)
}

export default MainScreen
