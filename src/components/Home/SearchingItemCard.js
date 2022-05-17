import React from 'react'
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native'

const SearchingItemCard = ({ product, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', product)}
      style={styles.card}>
      <View style={styles.container}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.productImage}
        />
      </View>
      <View style={{}}>
        <Text style={{ ...styles.productNameText, fontFamily: 'Nunito' }}>
          {product.productName}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 270,
    height: 100,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  container: {
    width: '30%',
    height: 100,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 22
  },
  productImage: {
    width: 100,
    height: '100%',
    resizeMode: 'contain'
  },
  productNameText: {
    fontSize: 14,
    maxWidth: '100%',
    color: '#000000',
    fontWeight: '600',
    letterSpacing: 1
  },
})

export default SearchingItemCard