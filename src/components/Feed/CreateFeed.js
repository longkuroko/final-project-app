import React, {useState} from 'react';
import {Text,View, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, TextInput } from "react-native";
import AntIcon from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import ImagePicker from 'react-native-image-picker';

const CreateFeed = ({navigation}) => {
  const [textValue, setTextValue] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator size="large" color="#f66" style={styles.activityIndicator} /> : null}
      {image === "" ? <TouchableOpacity
        onPress={() => {
          ImagePicker.launchImageLibrary({}, (response) => {
            if (!response.didCancel) {
              setImage(response.uri)
            }
          });
        }}
        style={styles.imageBox}>
        <AntIcon name="pluscircleo" color="white" size={80} />
        <Text style={{ fontSize: 20, marginTop: 5, color: "white" }}>Add Image</Text>
      </TouchableOpacity> : <ImageBackground source={{ uri: image }} style={{ height: 200, alignItems: "flex-end" }}>
        <TouchableOpacity
          onPress={() => {
            setImage("")
          }}
          style={{ padding: 10 }}>
          <Entypo name="circle-with-cross" color="white" size={30} />
        </TouchableOpacity>
      </ImageBackground>}
      <TextInput
        style={styles.textInputContent}
        placeholder="Nhập nội dụng..."
        value={textValue}
        onChangeText={ content => setTextValue(content)}
      />
      <TouchableOpacity style={styles.postButton}>
        <Text style={styles.postText}>Post</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff'
  },
  textInputContent: {
    color: '#333',
    textAlignVertical: "top",
    padding: 10
  },
  postText: {
    color: "white",
    margin: 15,
    fontSize: 20,
    textAlign: "center"
  },
  postButton: {
    backgroundColor: "#2980B9",
    margin: 5,
    borderRadius: 10,
    top: 300
  },
  activityIndicator: {
    position: "absolute",
    top: "45%",
    left: "45%"
  },
  imageBox: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: 200
  }
})
export default CreateFeed

