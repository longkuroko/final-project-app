import React from 'react';
import {View, StyleSheet} from "react-native";
import LottieView from 'lottie-react-native';

const SearchNotFound = () => {
  return (
    <View style={styles.NotFound}>
      <LottieView
        source={require("../../../assets/lottie/searchNotFound.json") }
        autoPlay loop style={styles.searchNotFound}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  NotFound: {
    flex: 1,
    padding: 10,
    marginVertical: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchNotFound: {
    width: 300,
    height: 300
  },
})
export default SearchNotFound;