import React, {useEffect, useRef, useState} from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ImageBackground, Dimensions, Animated } from 'react-native';
import axios from "axios";
import {API_HOST} from "../../util/API";
const CategoryList = ({ data, navigation }) => {

  const [categories, setCategories] = useState([]);
  
  useEffect()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.wrapText}>
          <View style={{ flexDirection: 'row', position: 'relative'}}>
            <Text style={styles.headerText}>
              Long Thanh Nguyen
            </Text>
          </View>
          <View style={styles.divider}></View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
  },
  header: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  wrapText: {
    flex: 1,
    position: 'relative',
    width: 150,
    paddingVertical: 10
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
    color: '#fff',
    paddingRight: 30
  },

})
export default CategoryList