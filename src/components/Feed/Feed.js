import React, { useContext } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/AntDesign'
import FeedCard from './FeedCard'
import { UserContext } from '../../context/UserContext'

const Feed = ({ navigation }) => {
	const userCTX = useContext(UserContext)
	const { token } = userCTX.state
	const checkIsLogin = () => {
		if (token === null) {
			return <Text>Bạn cần đăng nhập để thực hiện chức năng này</Text>
		}
		return () => navigation.navigate('CreateFeed')
	}
	return (
		<View style={styles.container}>
			<FeedCard />
			<TouchableOpacity
				onPress={() => navigation.navigate('CreateFeed')}
				style={{
					position: 'absolute',
					right: 60,
					bottom: 60,
					backgroundColor: '#39A2DB',
					borderRadius: 30
				}}>
				<MaterialIcon
					name='plus'
					color='white'
					size={15}
					style={{ margin: 20 }}
				/>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
export default Feed
