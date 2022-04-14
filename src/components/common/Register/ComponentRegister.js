import React, {useContext, useEffect, useState} from 'react'
import { TextInput, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFonts } from 'expo-font'
import axios from 'axios'
import { styles } from './ComponentRegister.style'
import { API_HOST } from '../../../util/API'
import { USER_ACTION, UserContext } from '../../../context/UserContext'
import Icon from 'react-native-vector-icons/Ionicons';

const ComponentRegister = ({ navigation }) => {

	const [account, setAccount] = useState({
		username: '',
		email: '',
		password: '',
		fullName: '',
		phoneNumber: ''
	})
	const userCTX = useContext(UserContext)

  const [showPassword, setShowPassword] = useState(true);
  const [validateFullName, setValidateFullName] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);
  const [validateUserName, setValidateUserName] = useState(false);
  const [Notifice, setNotifice] = useState({
    type: false,
    message: "",
    isShow: false
  })

  useEffect(() => {
    const isShow =  setTimeout(() => {
      setNotifice({type: false, message: "" , isShow: false})
    }, 1500)
    return () => {
      clearTimeout(isShow)
    }
  }, [Notifice])

  const valiEmail = (email) => {
    const check = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return check.test(String(email).toLowerCase());
  }
  const isValidFullName = (val) => {
    if (val.trim().length <= 0) {
      setValidateFullName(true);
    } else {
      setValidateFullName(false);
    }
  }
  const isValidUserName = (val) => {
    if (val.trim().length <= 3) {
      setValidateUserName(true);
    } else {
      setValidateUserName(false);
    }
  }
  const isValidPassword = (val) => {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    console.log(val);
    if (val.trim().length <= 5) {
      setValidatePassword(true);
    }
    else {
      if (format.test(val)) {
        setValidatePassword(true);
      } else {
        setValidatePassword(false);
      }
    }
  }
  const isValidEmail = (val) => {
    if (!valiEmail(val)) {
      setValidateEmail(true);
    } else {
      setValidateEmail(false);
    }
  }

	const [loaded] = useFonts({
		// eslint-disable-next-line global-require
		Comfortaa: require('../../../../assets/fonts/Comfortaa-Bold.ttf')
	})


	if (!loaded) {
		return null
	}

  const handleRegister = (account) => {
    if (account.username === ''
      || account.password === ''
      || account.fullName === ''
      || account.phoneNumber === ''
      || account.email === '') {
      setNotifice({
        type: false,
        message: "Vui lòng nhập đầy đủ các trường...",
      isShow: true})
    } else if (account) {
      if (validateEmail || validatePassword || validateFullName || validateUserName) {
        setNotifice({
          type: false,
          message: "Vui lòng nhập thông tin đúng yêu cầu...",
          isShow: true})
        return
      }
      axios.post(`${API_HOST}/api/v1/auth/login`, account)
        .then(res => {
          if (res.data) {
            setNotifice({ type: true, message: "Đăng ký thành công", isShow: true })
          }
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status === 409) {
              setNotifice({ type: false, message: "Tài khoản đã tồn tại", isShow: true })
            } else if (err.response.status === 204) {
              setNotifice({ type: false, message: "Lỗi nhập, vui lòng kiểm tra lại", isShow: true })
            } else {
              setNotifice({ type: false, message: "Hệ thống đang bảo trì", isShow: true })
            }
          }
        })
    }
  }
	return (
		<View style={styles.container}>
			<Text style={{ ...styles.title, fontFamily: 'Comfortaa' }}>
				Go Shopping
			</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Enter your full name'
          onChangeText ={fullName => setAccount({...account, fullName })}
          autoCorrect={false}
          autoCompleteType='off'
          onEndEditing={(e) => isValidFullName(e.nativeEvent.text)}
        />
        {validateFullName ? <Text style={styles.Validation}>Họ và tên không được để trống</Text> : null}
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Enter your username'
          onChangeText ={username => setAccount({...account, username })}
          autoCorrect={false}
          autoCompleteType='off'
          onEndEditing={(e) => isValidUserName(e.nativeEvent.text)}
        />
        {validateUserName ?
          <Text style={styles.Validation}>Tài khoản phải dài hơn hoặc bằng 4 kí tự và không chứa kí tự đặc biệt</Text>
          : null}
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Enter your email'
          onChangeText ={email => setAccount({...account, email })}
          autoCorrect={false}
          autoCompleteType='off'
          onEndEditing={(e) => isValidEmail(e.nativeEvent.text)}
        />
        {validateEmail ?
          <Text style={styles.Validation}>Vui lòng nhập theo cấu trúc : abc@gmail.com</Text>
          : null}
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Enter your password'
          onChangeText ={password => setAccount({...account, password })}
          autoCorrect={false}
          autoCompleteType='off'
          autoCapitalize="none"
          onEndEditing={(e) => isValidPassword(e.nativeEvent.text)}
        />
        <TouchableOpacity
          style={styles.eyePassword}
          onPress={() => setShowPassword(!showPassword)}>
          {
            // Security on === true
            showPassword
              ? <Icon name="eye-outline" size={15} />
              : <Icon name="eye-off-outline" size={15} />
          }
        </TouchableOpacity>
        {validatePassword ?
          <Text style={styles.Validation}>Mật khẩu phải dài hơn hoặc bằng 6 kí tự và không chứa kí tự đặc biệt</Text>
          : null}
      </View>

      <TouchableOpacity style={styles.registerBtn}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
	)
}

export default ComponentRegister
