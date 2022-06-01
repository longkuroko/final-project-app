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
import axios from 'axios'
import { styles } from './ScreenHome.style'
import Card from '../../components/Home/Card'
import { API_HOST } from '../../util/API'
import Searching from '../../components/Home/Searching'

const { width, height } = Dimensions.get('screen')

const Home = ({ navigation }) => {
	const [products, setProducts] = useState([])
	const [nextPage, setNextPage] = useState(1)
	const [categories, setCategories] = useState([])
	const [currentCategory, setCurrentCategory] = useState(6)
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

	const handleSearchByCategory = item => {
		setCurrentCategory(item)
	}
	const getCategories = async () => {
		await axios
			.get(`${API_HOST}/api/v1/mobile/category`, {
				headers: {
					'x-private-key': 'MasdhaMASHF@adfn%sad',
					'x-application-name': 'AFF-APP'
				}
			})
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



	const getProductPaging = async (page, size, categoryId) => {
		const { data } = await axios.get(
			`${API_HOST}/api/v1/mobile/product?page=${page}&page_size=${size}&categoryId=${categoryId}`,
			{
				headers: {
					'x-private-key': 'MasdhaMASHF@adfn%sad',
					'x-application-name': 'AFF-APP'
				}
			}
		)
		setProducts([...products, ...data.data])
	}

  const getProductByCategory = async (page, size, categoryId) => {
    const {data} = await axios.get(`${API_HOST}/api/v1/mobile/product?page=${page}&page_size=${size}&categoryId=${categoryId}`,
      {
        headers: {
          'x-private-key': 'MasdhaMASHF@adfn%sad',
          'x-application-name': 'AFF-APP'
        }
      })
    setProducts(data.data)
  }

	useEffect(() => {
		getProductPaging(1, 12, currentCategory)
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
						SSG SHOPPING
					</Text>
				</View>
			</View>
			<Searching navigation={navigation} isHomeScreen />
			<View style={styles.categoryListContainer}>
        {
          categories.map((item, index) => (
            <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => {
              setSelectedCategoryIndex(index)
              getProductByCategory(1, 12, item.categoryId)
              handleSearchByCategory(item.categoryId)
            }}>
            <View>
              <Text style={{...styles.activeCategoryListText, color: selectedCategoryIndex === index ? '#001D6E' : '#B7CADB'}}>
                {item.title}
              </Text>
              {selectedCategoryIndex === index && (
                <View style={{
                  height: 3,
                  width: '100%',
                  backgroundColor: '#001D6E',
                  marginTop: 2,
                }} />
              )}
            </View>
            </TouchableOpacity>
          ))
        }
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
          getProductPaging(nextPage + 1, 12, currentCategory)
          setNextPage(prevPage => prevPage + 1)
        }}>
        <Text>View more</Text>
      </TouchableOpacity>
		</SafeAreaView>
	)
}

export default Home
