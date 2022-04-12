import React, { useState } from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { styles } from './ScreenHome.style'

const Card = ({ plant, navigation }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={() => navigation.navigate('Detail', plant)}>
			<View style={styles.card}>
				<View style={{ alignItems: 'flex-end' }}>
					<View
						style={{
							width: 30,
							height: 30,
							borderRadius: 20,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: plant.like
								? 'rgba(245, 42, 42,0.2)'
								: 'rgba(0,0,0,0.2) '
						}}>
						<Icon
							name='favorite'
							size={18}
							color={plant.like ? '#D82148' : '#141E27'}
						/>
					</View>
				</View>

				<View
					style={{
						height: 100,
						alignItems: 'center'
					}}>
					<Image
						source={plant.img}
						style={{ flex: 1, resizeMode: 'contain' }}
					/>
				</View>
				<Text style={styles.plantName}>{plant.name}</Text>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 5
					}}>
					<Text style={styles.plantPrice}>${plant.price}</Text>
					<View
						style={{
							height: 25,
							width: 25,
							backgroundColor: '#019267',
							borderRadius: 5,
							justifyContent: 'center',
							alignItems: 'center'
						}}
					/>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default Card
