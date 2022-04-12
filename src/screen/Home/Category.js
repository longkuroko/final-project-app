
import React, {useState} from 'react';
import {Pressable, View, Text, StyleSheet} from "react-native";
import {styles} from "./ScreenHome.style";
const Category = ({ navigation }) => {

  const categoryList = ['Popular', 'Recommended', 'Nearest']

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
  return (
    <View style={styles.categoryListContainer}>
      {categoryList.map((category, index) => (
        <Pressable
          key={index}
          onPress={() => setSelectedCategoryIndex(index)}>
          <Text
            style={[
              styles.categoryListText,
              index == selectedCategoryIndex && styles.activeCategoryListText,
            ]}>
            {category}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}


export default Category