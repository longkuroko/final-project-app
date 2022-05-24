import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import {
	FlatList,
	SafeAreaView,
	Text,
	View,
	TouchableOpacity,
	Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios'
import { styles } from './ScreenHome.style'
import Card from '../../components/Home/Card'
import { API_HOST } from '../../util/API'
import SearchNotFound from '../../components/common/SearchNotFound'
import Searching from '../../components/Home/Searching'
import Category from "../../components/Category/Category";

const { width, height } = Dimensions.get('screen')

const Home = ({ navigation }) => {
	const [products, setProducts] = useState([])
	const [nextPage, setNextPage] = useState(1)
  const [categories, setCategories] = useState([])

	const searchEvent = searchTxt => {
		getListProduct(searchTxt)
	}

  const getCategories = async () => {
    await axios
      .get(`${API_HOST}/api/v1/admin/category`)
      .then(res => {
        if (res && res.data) {
          console.log('category', res.data)
          setCategories(res.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

	const getProductPaging = async (page, size) => {
		const { data } = await axios.get(
			`${API_HOST}/api/v1/mobile/product?page=${page}&page_size=${size}`,
			{
				headers: {
					'x-private-key': 'MasdhaMASHF@adfn%sad',
					'x-application-name': 'AFF-APP'
				}
			}
		)
		setProducts([...products, ...data.data])
	}

	useEffect(() => {
		getProductPaging(1, 12)
    getCategories()
	}, [])

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
			<Searching navigation={navigation} isHomeScreen />
      <View style={styles.categoryListContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return <Category data={item} />
          }}
        />
      </View>
			<FlatList
				columnWrapperStyle={{ justifyContent: 'space-between' }}
				contentContainerStyle={{
					marginTop: 10,
					paddingBottom: 50
				}}
				numColumns={2}
				data={products}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => {
					return <Card product={item} navigation={navigation} />
				}}
			/>
      <TouchableOpacity
        style={styles.viewMoreBtn}
        onPress={() => {
          getProductPaging(nextPage + 1, 12)
          setNextPage(prevPage => prevPage + 1)
        }}>
        <Text>View more</Text>
      </TouchableOpacity>
		</SafeAreaView>
	)
}

export default Home
