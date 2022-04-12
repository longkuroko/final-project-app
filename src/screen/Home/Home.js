import React, { useState } from 'react'
import { useFonts } from 'expo-font'
import { FlatList, SafeAreaView, Text, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { styles } from './ScreenHome.style'
import plants from '../../context/product'
import Card from './Card'

const Home = ({ navigation }) => {
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

export default Home
