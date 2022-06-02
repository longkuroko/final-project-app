import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

const Comment = ({ comment, navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.commentContainer}>
				<Image
					source={{
						uri: 'https://organicthemes.com/demo/profile/files/2018/05/profile-pic.jpg'
					}}
					style={{ width: 40, height: 40, borderRadius: 50, marginRight: 10 }}
				/>
				<View>
					<Text style={styles.customerNameText}>{comment.customerName}</Text>
					<Text style={styles.ratingText}>
						{comment.customerSatisfactionLevel}
					</Text>
				</View>
			</View>
			<View>
				<Text style={{ fontSize: 12, opacity: 0.7 }}>{comment.content}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		margin: 10,
		padding: 10,
		marginBottom: 5,
		borderRadius: 10,
		shadowOffset: { width: 0, height: 1 },
		shadowColor: '#9BA3EB',
		shadowOpacity: 0.3,
		shadowRadius: 10,
		backgroundColor: '#EDEEF7'
	},
	commentContainer: {
		flexDirection: 'row'
	},
	customerNameText: {
		fontWeight: 'bold',
		fontSize: 15
	},
	ratingText: {
		fontWeight: 'bold',
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 4,
		opacity: 0.8
	}
})
export default Comment
