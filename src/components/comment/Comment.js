import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'

const Comment = ({ comment, navigation }) => {
	return (
		<View style={styles.commentContainer}>
			<View>
				<Text style={styles.customerNameText}>{comment.customerName}</Text>
			</View>
			<View>
				<Text style={styles.ratingText}>
					{comment.customerSatisfactionLevel}
				</Text>
			</View>
			<View>
				<Text>{comment.content}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	commentContainer: {
		elevation: 20,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		shadowColor: '#333',
		backgroundColor: '#EEEEEE',
		margin: 8
	},
	customerNameText: {
		fontWeight: 'bold',
		fontSize: 15
	},
	ratingText: {
		fontWeight: 'bold',
		borderBottomRightRadius: 20,
		borderBottomLeftRadius: 20,
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 4
	}
})
export default Comment
