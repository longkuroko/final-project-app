import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Feed from '../../components/Feed/Feed'
import CreateFeed from '../../components/Feed/CreateFeed'
import FeedDetail from '../../components/Feed/FeedDetail'
import EditPost from '../../components/Feed/EditPost'

const feedStack = createStackNavigator()
const FeedNavigation = ({ navigation }) => {
	return (
		<feedStack.Navigator>
			<feedStack.Screen
				name='Feed'
				options={{ headerShown: false }}
				component={Feed}
			/>
			<feedStack.Screen
				name='CreateFeed'
				options={{ headerShown: false }}
				component={CreateFeed}
			/>
			<feedStack.Screen
				name='FeedDetail'
				options={{ headerShown: false }}
				component={FeedDetail}
			/>
			<feedStack.Screen
				name='UpdateFeed'
				options={{ headerShown: false }}
				component={EditPost}
			/>
		</feedStack.Navigator>
	)
}

export default FeedNavigation
