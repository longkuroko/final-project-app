import React, { useContext } from 'react'
import {
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions, Linking, Alert
} from 'react-native'
import Entypo from  'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RelatedProductList from "./RelatedProductList";
import ProductCompareList from "./ProductCompareList";

const {width} = Dimensions.get('window')
const ProductDetail = ({ navigation, route }) => {
  const product = route.params

  const openUrl = async (url) => {
    const isSupported = await Linking.canOpenURL(url)
    if (isSupported) {
      await Linking.openURL(url)
    } else {
      Alert.alert("Can not open this link!")
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
          backgroundColor='#F0F0F3'
          barStyle="dark-content"
      />
      <ScrollView>
        <View styles={styles.detailContainer}>
          <View style={styles.backContainer}>
            <TouchableOpacity onPress={() => navigation.goBack('Home')}>
              <Entypo name="chevron-left" style={styles.backBtn}/>
            </TouchableOpacity>
          </View>
         <View style={styles.imageContainer}>
           <Image source={{uri: product.thumbnail}} style={styles.imageProduct}/>
         </View>
        </View>
        <View style={styles.productDescription}>
          <View style={styles.productNameContainer}>
            <Text style={styles.productName}>{product.productName}</Text>
            <TouchableOpacity
              onPress={() => {
                openUrl(`https://www.tiki.vn/nhung-dem-khong-ngu-nhung-ngay-cham-troi-p87226756.html?spid=87226759`)
              }}
            >
              <Ionicons
                name="link-outline"
                style={styles.linkProduct}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.productDescriptionText}>
            this product is so good dude
          </Text>
        </View>
        <View style={{paddingHorizontal: 16}}>
          <Text style={styles.productPriceText}>
            &#8377; {product.price}.00 VNĐ
          </Text>
        </View>
      </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    position: 'relative'
  },
  backContainer: {
    width: '100%',
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingLeft: 16,
  },
  backBtn: {
    fontSize: 18,
    color: '#777777',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  detailContainer: {
    width: '100%',
    backgroundColor: '#F0F0F3',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    position: "relative",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4
  },
  imageContainer: {
    width: width,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageProduct: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  productDescription: {
    paddingHorizontal: 16,
    marginTop: 6
  },
  productNameContainer: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  productName: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginVertical: 4,
    color: '#000000',
    maxWidth: '84%',
  },
  linkProduct: {
    fontSize: 24,
    color: '#0043F9',
    backgroundColor: '#0043F9' + 10,
    padding: 8,
    borderRadius: 100,
  },
  productDescriptionText: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '400',
    letterSpacing: 1,
    opacity: 0.5,
    lineHeight: 20,
    maxWidth: '85%',
    maxHeight: 44,
    marginBottom: 18,
  },
  productPriceText: {
    fontSize: 18,
    fontWeight: '500',
    maxWidth: '85%',
    color: '#000000',
    marginBottom: 4,
  },
  comparingText: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginVertical: 10,
    color: '#000000'
  }
})

export default ProductDetail
