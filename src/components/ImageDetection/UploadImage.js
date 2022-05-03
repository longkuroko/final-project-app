import React, {useEffect, useState} from 'react';
import {Button, View, StyleSheet, Text, Image} from "react-native";
import * as ImagePicker from 'expo-image-picker';

const UploadImage = ({navigation}) => {

  const [hasGallaryPermission, setHasGallaryPermission] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGallaryPermission(galleryStatus.status === 'granted')
    })();
  }, []);

  const pickImage = async () => {
    const images = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1
    });

    console.log(images);
    if (!images.cancelled) {
      setImage(images.uri);
    }
  }

  if (hasGallaryPermission === false) {
    return <Text>No access to Gallery</Text>
  }
  return (
    <View style={styles.container}>
      <Button title="upload" onPress={() => pickImage()} style={{marginTop:30}}/>
      { image && <Image source={{uri: image}} style={styles.image}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image:{
    flex: 1/2
  }
})



export default UploadImage