import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { UserContext } from '../../context/UserContext'
import ComponentCommon from '../../components/common/ComponentCommon'
import ComponentB from '../../components/screenB/ComponentB'

const ScreenB = () => {
	const userCTX = useContext(UserContext)

	if (userCTX.state.login) {
		return (
			<View>
				<ComponentCommon />
				<ComponentB />
				<Text> Screen B </Text>
			</View>
		)
	}

	return (
		<View>
			<ComponentCommon />
			<Text>Need to Authentication here</Text>
		</View>
	)
}

export default ScreenB
