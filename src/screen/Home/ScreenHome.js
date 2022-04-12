import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './Home'
import Card from './Card'
import Detail from './Detail'

const HomeStack = createStackNavigator()

const ScreenHome = ({ navigation }) => {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen
        name='Home'
        component={Home}
      />
			<HomeStack.Screen
        name='Detail'
        component={Detail}
      />
			<HomeStack.Screen
        name='Card'
        component={Card}
      />
		</HomeStack.Navigator>
	)
}

export default ScreenHome
