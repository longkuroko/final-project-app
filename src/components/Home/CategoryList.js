import React, { useEffect, useRef, useState } from 'react'
import {
	View,
	StyleSheet,
	Text,
	FlatList,
	TouchableOpacity
} from 'react-native'
import axios from 'axios'
import { styles } from './HomeStyle'
import Card from './Card'
import { API_HOST } from '../../util/API'

const CategoryList = ({ navigation }) => {
	const categories = ['POPULAR', 'NEW ', 'FOR YOU', 'TECHNOLOGY']
	return (
		<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.wrapText}>
						<View style={{ flexDirection: 'row', position: 'relative' }}>
							<Text style={styles.headerText}></Text>
						</View>
					</View>
					<View>
						<TouchableOpacity style={styles.btnViewMore}>
							<Text style={{ color: 'white' }}>Xem Thêm</Text>
						</TouchableOpacity>
					</View>
				</View>
		</View>
	)
}

export default CategoryList
