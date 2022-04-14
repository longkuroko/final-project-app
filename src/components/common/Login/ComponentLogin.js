import React, { useContext, useState } from 'react'
import { TextInput, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFonts } from 'expo-font'
import axios from 'axios'
import { styles } from './ComponentLogin.style'
import { API_HOST } from '../../../util/API'
import { USER_ACTION, UserContext } from '../../../context/UserContext'

const ComponentLogin = ({ navigation }) => {
  const [account, setAccount] = useState({
    username: '',
    password: ''
  })

  const userCTX = useContext(UserContext)

  const [fail, setFail] = useState(null)

  const handleLogic = () => {
    axios
      .post(`${API_HOST}/api/v1/auth/login`, { ...account })
      .then(response => {
        if (response.data !== undefined) {
          setFail(false)
          console.log(response.data.token)
          userCTX.login(USER_ACTION.LOGIN, response.data.token)
        } else {
          setFail(true)
        }
      })
      .catch(reason => {
        console.log(reason)
      })
  }

  const [loaded] = useFonts({
    // eslint-disable-next-line global-require
    Comfortaa: require('../../../../assets/fonts/Comfortaa-Bold.ttf')
  })

  if (!loaded) {
    return null
  }
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.title, fontFamily: 'Comfortaa' }}>
        Go Shopping
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Enter your username'
          placeholderTextColor='#003f5c'
          onChangeText={username => {
            setAccount({ ...account, username })
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Enter your password'
          placeholderTextColor='#003f5c'
          onChangeText={password => {
            setAccount({ ...account, password })
          }}
          secureTextEntry
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot your password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ScreenRegister')}>
        <Text style={styles.forgot_button}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogic}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  )
}
export default ComponentLogin