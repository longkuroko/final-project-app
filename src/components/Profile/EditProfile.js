import React, {createRef, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, TextInput,ImageBackground} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {useTheme} from "react-native-paper";

const EditProfile = ({navigation, route}) => {
  const profile = route.params;
  const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png')

  // const takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     compressImageMaxWidth: 300,
  //     compressImageMaxHeight: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7
  //     // eslint-disable-next-line no-shadow
  //   }).then(image => {
  //     console.log(image)
  //     setImage(image.path);
  //     bs.current.snapTo(1);
  //   })
  // }
  //
  // const choosePhotoFromLibrary = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7
  //     // eslint-disable-next-line no-shadow
  //   }).then(image => {
  //     console.log(image);
  //     setImage(image.path);
  //     bs.current.snapTo(1);
  //   });
  // }

  const {colors} = useTheme()
  const bs = createRef();
  const fall = new Animated.Value(1)

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} >
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  )
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  )
  return (
    <View style={styles.container} >
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction
      />
      <Animated.View style={{ margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0))
      }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={{uri: image}}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View style={styles.imageView}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={styles.imageIcon}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={styles.textName}>{profile.username}</Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20}/>
          <TextInput
            placeholder= "Họ tên"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            value={profile.fullName}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20}/>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={styles.textInput}
            value={profile.email}
          />
        </View>

        <View style={styles.action}>
          <Feather name="phone" color={colors.text} size={20}/>
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={styles.textInput}
            value={profile.phone}
          />
        </View>
        <TouchableOpacity style={styles.commandButton}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  panel: {
    padding: 20,
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageIcon: {
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10
  },
  textName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a'
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
})

export default EditProfile
