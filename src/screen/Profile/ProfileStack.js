import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EditProfile from "../../components/Profile/EditProfile";
import ScreenProfile from "./ScreenProfile";

const ProfileStack = createStackNavigator();

const ProfileNavigator = ({ navigation }) => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ScreenProfile"
        options={{ headerShown: false }}
        component={ScreenProfile}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{ headerShown: false }}
        component={EditProfile}
      />
    </ProfileStack.Navigator>
  )
}

export default ProfileNavigator