
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const CategoryItem = ( {item }) => {
  return (
    <View style={styles.CategoryItem}>
      <Text style={styles.CategoryText}>{item}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  CategoryItem: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 3,
    margin: 2,
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: "rgba(255,255,255,.3)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.5)",
  },
  CategoryText: {
    color: "#fff",
    fontSize: 10
  }
})

export default CategoryItem