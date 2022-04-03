import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ScreenHome from './Home/ScreenHome'
import ScreenLogin from './Login/ScreenLogin'
import ScreenRegister from './Login/ScreenRegister'
import ScreenDetail from "./Detail/ScreenDetail";

const Drawer = createDrawerNavigator()

const MainScreen = () => {
	return (
		<Drawer.Navigator>
			<Drawer.Screen
				name='Home'
				component={ScreenHome}
				options={{ title: 'Home' }}
			/>
			<Drawer.Screen name='ScreenLogin' component={ScreenLogin} />
			<Drawer.Screen name='ScreenRegister' component={ScreenRegister} />
      <Drawer.Screen name='Details' component={ScreenDetail} />
    </Drawer.Navigator>
	)
}

export default MainScreen
