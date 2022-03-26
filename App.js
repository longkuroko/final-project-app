import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ScreenA from './src/screen/ScreenA'
import ScreenB from './src/screen/ScreenB'

const Drawer = createDrawerNavigator()

const MainScreen = () => {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name='ScreenA' component={ScreenA} />
			<Drawer.Screen name='ScreenB' component={ScreenB} />
		</Drawer.Navigator>
	)
}

const App = () => {
	return (
		<NavigationContainer>
			<MainScreen />
		</NavigationContainer>
	)
}

export default App
