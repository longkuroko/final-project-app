import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './Home'
import Card from '../../components/Home/Card'

const HomeStack = createStackNavigator()

const ScreenHome = ({ navigation }) => {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen
				name='Home'
				options={{ headerShown: false }}
				component={Home}
			/>
			<HomeStack.Screen
				name='Card'
				options={{ headerShown: false }}
				component={Card}
			/>
		</HomeStack.Navigator>
	)
}

export default ScreenHome
