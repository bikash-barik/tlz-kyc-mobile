import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ForgotPasswordScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assests/sliderbg.png')}
        style={styles.image}
      />
      <Image source={require('../../assests/TLZ-Logo.png')} style={styles.logoimage} />
      <Text style={styles.forgotText}>Forgot Password</Text>
      <Text style={styles.levelText}>User Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Email / User Name"
        placeholderTextColor="#a9a9a9"
      />
      
      <TouchableOpacity style={styles.otpButton}>
        <Text style={styles.otpButtonText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: width * 1,
    height: height * 0.4,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  logoimage:{
    width: '100%',
    height: '15%',
    resizeMode: 'contain',
  },
  forgotText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
    color:"#000",
  },
  levelText:{
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
    color:"#000",
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  
  otpButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#074E76',
    paddingVertical: 7,
    paddingHorizontal: "20%",
    borderRadius: 5,
    marginTop: 10,
  },
  otpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});