import React, { useEffect, useRef, useState } from 'react'
import {Dimensions, FlatList, Image, TextInput, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { styles } from '../../screen/Home/ScreenHome.style'
import {useDebounce} from "use-debounce";
import axios from "axios";
import {API_HOST} from "../../util/API";
import Card from "./Card";
import SearchingItemCard from "./SearchingItemCard";
const { width } = Dimensions.get('window')
const Searching = ({ navigation, isHomeScreen }) => {
	const [textSearch, setTextSearch] = useState('')
  const [products, setProducts] = useState([]);
  const [texDebouncedText]  = useDebounce(textSearch, 1000)

  const getProductPaging = async (txtSearch) => {
    if (txtSearch !== '') {
      const { data } = await axios.get(
        `${API_HOST}/api/v1/mobile/product?search=${txtSearch}`,
        {
          headers: {
            'x-private-key': 'MasdhaMASHF@adfn%sad',
            'x-application-name': 'AFF-APP'
          }
        }
      )
      setProducts(data.data)
    }
  }

  useEffect(() => {
		if (!isHomeScreen) {
      getProductPaging(textSearch)
		}
	}, [texDebouncedText])

	if (isHomeScreen) {
		return (
        <View style={{ marginTop: 30, flexDirection: 'row' }}>
          <View style={styles.searchContainer}>
            <TouchableOpacity
              onPress={() => {
                if (isHomeScreen) {
                  navigation.navigate('Searching')
                }
              }}>
              <Icon name='search' size={25} style={styles.iconSearch} />
            </TouchableOpacity>
            <TextInput
              placeholder='search...'
              onChangeText={txtSearch => {
                setTextSearch(txtSearch)
              }}
              onTouchStart={() => {
                if (isHomeScreen) {
                  navigation.navigate('Searching')
                }
              }}
              style={styles.input}
            />
          </View>
        </View>
		)
	}
	return (
    <View style={styles.container}>
      <View style={{
        width: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
      }}>
          <TouchableOpacity onPress={() => {
            navigation.goBack('Home')
            setProducts([])
            setTextSearch('')
          }}>
            <Entypo
              name='chevron-left'
            />
          </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30, flexDirection: 'row' }}>
        <View style={styles.searchContainer}>
          <TouchableOpacity>
            <Icon name='search' size={25} style={styles.iconSearch} />
          </TouchableOpacity>
          <TextInput
            placeholder='search...'
            onChangeText={txtSearch => {
              setTextSearch(txtSearch)
            }}
            style={styles.input}
          />
        </View>
      </View>
      <FlatList
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50
        }}
        data={products}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return <SearchingItemCard product={item} navigation={navigation}/>
        }}
      />
    </View>
	)
}
export default Searching
