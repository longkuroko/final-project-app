import React, { useState } from 'react'
import {
	View,
	TextInput,
	Text,
	SafeAreaView,
	FlatList,
	Image
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useFonts } from 'expo-font'
import { styles } from './ScreenHome.style'
import plants from '../../context/product'

const Card = ({ plant, navigation }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={() => navigation.navigate('Details', plant)}>
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
						}}>
						<Text style={{ fontSize: 22, color: 'fff', fontWeight: 'bold' }}>
							+
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const ScreenHome = ({ navigation }) => {
	const [loaded] = useFonts({
		// eslint-disable-next-line global-require
		Montserrat: require('../../../assets/fonts/Comfortaa-Bold.ttf')
	})

	if (!loaded) {
		return null
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View>
					<Text style={{ ...styles.title1, fontFamily: 'Montserrat' }}>
						Welcome to
					</Text>
					<Text style={{ ...styles.title2, fontFamily: 'Montserrat' }}>
						Go Shopping
					</Text>
				</View>
			</View>

			<View style={{ marginTop: 30, flexDirection: 'row' }}>
				<View style={styles.searchContainer}>
					<Icon name='search' size={25} style={styles.iconSearch} />
					<TextInput placeholder='search...' style={styles.input} />
				</View>
			</View>
			<FlatList
				columnWrapperStyle={{ justifyContent: 'space-between' }}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					marginTop: 10,
					paddingBottom: 50
				}}
				numColumns={2}
				data={plants}
				renderItem={({ item }) => {
					return <Card plant={item} navigation={navigation} />
				}}
			/>
		</SafeAreaView>
	)
}

export default ScreenHome
