import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Feed from "../../components/Feed/Feed";
import CreateFeed from "../../components/Feed/CreateFeed";

const feedStack = createStackNavigator()
const FeedNavigation = ({ navigation }) => {
  return (
    <feedStack.Navigator>
      <feedStack.Screen name="Feed" options={{headerShown: false}} component={Feed} />
      <feedStack.Screen name="CreateFeed" options={{headerShown: false}} component={CreateFeed} />
    </feedStack.Navigator>
  )
}

export default FeedNavigation