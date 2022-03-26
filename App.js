import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import AppContext from './src/context/UserContext'
import MainScreen from './src/screen/ScreenContainer'

const App = () => {
	return (
		<NavigationContainer>
			<AppContext>
				<MainScreen />
			</AppContext>
		</NavigationContainer>
	)
}

export default App
