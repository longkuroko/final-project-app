import React from 'react'
import { TouchableOpacity, View, Image, Text , StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ProductComparingCard = ({ product, navigation}) => {
  return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', product)}
        style={styles.card}>
        <View style={styles.container}>
          <Image source={{uri: product.thumbnail}} style={styles.productImage} />
        </View>
        <View style={{}}>
          <Text style={styles.productNameText}>
            {product.productName}
          </Text>
          <View style={styles.productPriceContainer}>
            <Text style={styles.productPriceText}>
              {product.price}
            </Text>
          </View>
        </View>
        <View style={styles.linkView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
          }}>
            <TouchableOpacity>
              <Ionicons
              name="link-outline"
              style={styles.productLink}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card : {
    width: '100%',
    height: 100,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    width: '30%',
    height: 100,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 22,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  productNameText: {
    fontSize: 14,
    maxWidth: '100%',
    color: '#000000',
    fontWeight: '600',
    letterSpacing: 1,
  },
  productPriceContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.6,
  },
  productPriceText: {
    fontSize: 14,
    fontWeight: '400',
    maxWidth: '85%',
    marginRight: 4
  },
  linkView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  productLink: {
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 100,
  }
})
export default ProductComparingCard