import React, {useEffect, useState} from 'react';
import axios from "axios";
import {FlatList} from "react-native";
import {API_HOST} from "../../util/API";
import ProductComparingCard from "./productComparingCard";

const ProductCompareList = ({navigation}) => {
  const [compareProduct, setCompareProduct] = useState([])
  useEffect(() => {
    axios
      .get(`${API_HOST}/api/v1/mobile/product?page=${1}&page_size=${4}`, {
        headers: {
          'x-private-key': 'MasdhaMASHF@adfn%sad',
          'x-application-name': 'AFF-APP'
        }
      })
      .then(res => {
        if (res && res.data.data) {
          // eslint-disable-next-line no-param-reassign
          console.log(res.data.data)
          setCompareProduct(res.data.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <FlatList 
      data={compareProduct}
      renderItem={({item}) => {
        return  (
          <ProductComparingCard product={item} navigation={navigation}  />
        )
      }} />
  )
}


export default ProductCompareList