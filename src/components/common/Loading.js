import React, { useEffect, useRef } from 'react'
import { Animated, View, Image, StyleSheet } from 'react-native'

export const Loading = ({ navigation }) => {
	const fadeAnim = useRef(new Animated.Value(0)).current
	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 1000,
			loop: Infinity
		}).start()

		setTimeout(() => {
			navigation.navigation('Home')
		}, 1000)
	}, [])
	return (
		<View>
			<View style={styles.container}>
				<Animated.View
					style={[
						{
							opacity: fadeAnim
						}
					]}>
					<Image
						style={styles.logo}
						onPress={() => navigation.navigate('Home')}
					/>
				</Animated.View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%'
	}
})
