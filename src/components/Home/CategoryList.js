import React, { useEffect, useRef, useState } from 'react'
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	FlatList
} from 'react-native'
import axios from 'axios'
import { API_HOST } from '../../util/API'

const Category = ({ category, navigation }) => (
	<View style={styles.categoryContainer}>
		<TouchableOpacity activeOpacity={0.8}>
			<Text style={styles.categoryText}>{category.title}</Text>
		</TouchableOpacity>
	</View>
)

const CategoryList = () => {
	const [categories, setCategories] = useState([])

	const getCategories = async () => {
		await axios
			.get(`${API_HOST}/api/v1/admin/category`)
			.then(res => {
				if (res && res.data) {
					setCategories(res.data)
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	useEffect(() => {
		getCategories()
	})
	return (
		<FlatList
			horizontal
			data={categories}
			keyExtractor={(_, index) => index.toString()}
			renderItem={({ item }) => {
				return <Category category={item} />
			}}
		/>
	)
}

const styles = StyleSheet.create({
	categoryContainer: {
		flexDirection: 'row',
		marginTop: 30,
		marginBottom: 20,
		justifyContent: 'space-between'
	},
	categoryText: {
		fontSize: 16,
		color: 'grey',
		fontWeight: 'bold'
	},
	categoryTextSelected: {
		color: '#2980B9',
		paddingBottom: 5,
		borderBottomWidth: 2,
		borderColor: '#2980B9'
	}
})
export default CategoryList
