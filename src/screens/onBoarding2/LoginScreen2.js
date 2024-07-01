import React from 'react'
import { View,Image,Text } from 'react-native';
import dashImage from '../../assests/dashImage.png'

const LoginScreen2 = () => {
  return (
    <View>
      <Image
        source={dashImage}
        style={{width:'100%',height:'68%'}}
      />
       <Text>Welcome!</Text>
    </View>
  )
}

export default LoginScreen2
