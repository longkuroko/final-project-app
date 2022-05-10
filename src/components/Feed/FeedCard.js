import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/AntDesign'

const FeedCard = () => {
	return (
		<View style={styles.container}>
			<View style={styles.cardContainer}>
				<Image
					source={{
						uri: 'https://organicthemes.com/demo/profile/files/2018/05/profile-pic.jpg'
					}}
					style={{ height: 50, width: 50, borderRadius: 50 }}
				/>
				<View style={{ marginLeft: 10 }}>
					<Text style={{ fontSize: 20 }}>Long Nguyen</Text>
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ fontSize: 12 }}>14/09</Text>
						<Text style={{ fontSize: 12, marginLeft: 5 }}> 3:00</Text>
					</View>
				</View>
			</View>

			<Image
				source={require('../../../assets/plant1.png')}
				style={{ height: 200, width: '100%' }}
			/>

			<Text style={styles.textContent}>Nguyen Thanh Long</Text>

			<View style={{ height: 1, width: '100%', backgroundColor: '#3333' }} />

			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity style={{ flex: 1, margin: 10 }}>
					<Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Like</Text>
				</TouchableOpacity>

				<View style={{ backgroundColor: '#3333', height: '100%', width: 1 }} />

				<TouchableOpacity style={{ flex: 1, margin: 10 }}>
					<Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
						Comment
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		margin: 10,
		borderRadius: 7,
		elevation: 5,
		shadowColor: '#333',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.5,
		shadowRadius: 2
	},
	cardContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10
	},
	textContent: {
		margin: 10,
		color: '#333',
		fontSize: 12,
		marginTop: 5
	}
})

export default FeedCard
