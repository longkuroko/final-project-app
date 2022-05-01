import React, {useEffect, useState} from 'react'
import { useFonts } from 'expo-font'
import {FlatList, SafeAreaView, Text, TextInput, View, TouchableOpacity, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import axios from "axios";
import { styles } from './ScreenHome.style'
import CategoryList from '../../components/Home/CategoryList'
import Card from '../../components/Home/Card'
import {API_HOST} from "../../util/API";

const { width, height } = Dimensions.get('screen')


const Home = ({ navigation }) => {

  const [products, setProducts] = useState([])
  const [textSearch, setTextSearch] = useState('');
  useEffect(() => {
    axios
      .get(`${API_HOST}/api/v1/mobile/product`, {
        headers: {
          'x-private-key': 'MasdhaMASHF@adfn%sad',
          'x-application-name': 'AFF-APP'
        }
      })
      .then(res => {
        if (res && res.data.data) {
          // eslint-disable-next-line no-param-reassign
          console.log(res.data.data)
          setProducts(res.data.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


	const [loaded] = useFonts({
		// eslint-disable-next-line global-require
		Montserrat: require('../../../assets/fonts/Comfortaa-Bold.ttf')
	})

	if (!loaded || products.length === 0) {
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
        	contentContainerStyle={{
        		marginTop: 10,
        		paddingBottom: 50,
        	}}
        	numColumns={2}
        	data={products}
          keyExtractor={(_, index) => index.toString()}
        	renderItem={({ item }) => {
            return <Card product={item} navigation={navigation}/>
        	}}
        />
      <View style={{ marginTop: 30, flexDirection: 'row' }}>
        <View style={styles.searchContainer}>
          <TouchableOpacity>
            <Text>View more</Text>
          </TouchableOpacity>
        </View>
      </View>
		</SafeAreaView>
	)
}

export default Home
