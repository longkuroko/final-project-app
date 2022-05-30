import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import {FlatList, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {API_HOST} from "../../util/API";
import {UserContext} from "../../context/UserContext";
import {styles} from "../../screen/Home/ScreenHome.style";
import Card from "../Home/Card";
import Searching from "../Home/Searching";

const ProductLikeList = ({ navigation }) => {
  const userCTX = useContext(UserContext)
  const [products, setProducts] = useState([])
  const token = JSON.parse(userCTX.state.token)

  const getProductLike = () => {
    axios.get(
      `${API_HOST}/api/v1/mobile/user/save-product`,
      {
        headers: {
          'x-private-key': 'MasdhaMASHF@adfn%sad',
          'x-application-name': 'AFF-APP',
          Authorization: `Bearer ${token}`
        }
      }
    ).then(res => {
      if (res && res.data ) {
        console.log(res.data);
        setProducts(res.data)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getProductLike()
  }, [])

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
    </SafeAreaView>
  )
}

export default ProductLikeList;