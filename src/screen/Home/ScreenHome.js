import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './Home'
import Card from '../../components/Home/Card'
import ProductDetail from '../../components/ProductDetail/ProductDetail'

const HomeStack = createStackNavigator()

const ScreenHome = ({ navigation }) => {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen name='Home' component={Home} />
			<HomeStack.Screen name='Detail' component={ProductDetail} />
			<HomeStack.Screen name='Card' component={Card} />
		</HomeStack.Navigator>
	)
}

export default ScreenHome
