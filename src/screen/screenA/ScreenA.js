import React, { useContext } from 'react'
import { Button, Text, View } from 'react-native'
import ComponentCommon from '../../components/common/ComponentCommon'
import ComponentA from '../../components/screenA/ComponentA'
import { UserContext, USER_ACTION } from '../../context/UserContext'

const ScreenA = () => {
	const userCTX = useContext(UserContext)

	const process = state => {
		if (state) {
			userCTX.verify(USER_ACTION.LOGOUT)
		} else {
			userCTX.verify(USER_ACTION.LOGIN)
		}
	}

	return (
		<View>
			<ComponentCommon />
			<Text> Screen A </Text>
			<ComponentA />
			{userCTX.state.login ? (
				<Button
					title='Đăng xuất'
					onPress={() => process(userCTX.state.login)}
				/>
			) : (
				<Button
					title='Đăng nhập'
					onPress={() => process(userCTX.state.login)}
				/>
			)}
		</View>
	)
}

export default ScreenA
