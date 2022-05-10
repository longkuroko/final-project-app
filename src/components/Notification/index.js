import React from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native'

const { width, height } = Dimensions.get('screen')

const index = ({ text, type }) => {
	return (
		<View
			style={{
				flex: 1,
				zIndex: 10,
				position: 'absolute',
				top: height / 2 - 100,
				marginBottom: 100,
				backgroundColor: 'rgba(0,0,0,.5)',
				padding: 10,
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: 200,
				height: 200
			}}>
			<View style={{ marginBottom: 10 }}>
				{type ? (
					// eslint-disable-next-line global-require
					<LottieView
						source={require('../../../assets/lottie/sendSuccessfully.json')}
						autoPlay
						loop
						style={{ width: 100, height: 100 }}
					/>
				) : (
					// eslint-disable-next-line global-require
					<LottieView
						source={require('../../../assets/lottie/error.json')}
						autoPlay
						loop
						style={{
							width: 100,
							height: 100
						}}
					/>
				)}
			</View>
			<Text
				style={{
					fontSize: 15,
					color: '#fff',
					fontWeight: '500',
					textAlign: 'center'
				}}>
				{text}
			</Text>
		</View>
	)
}
export default index
