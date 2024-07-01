import React from 'react'
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import Footer from '../components/Footer';


const {width,height} = Dimensions.get('window');
const ImageUpload = () => {
  return (
    <View style={styles.container}>
    <SafeAreaView style={styles.container1}>
      <WebView 
        source={{ uri: 'https://webocr-two.vercel.app/' }} 
        style={styles.webview}
      />
      <Footer/>
    </SafeAreaView>
  </View>
  )
}

const styles = StyleSheet.create({
    container1: {
      flex: 1,
      width: width,
      height: height,
    },
    webview: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },


     attachContainer: {
    width: "89%",
    height: "37%",
    borderColor: '#52ABC7',
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: '0.5%',
  },
  borderImage: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: '#52ABC7',
    borderWidth: 2,
    borderRadius: 5,
    width: "90%"
  },
  imagetext: {
color: "#006AFF"
  }
  });

export default ImageUpload;
