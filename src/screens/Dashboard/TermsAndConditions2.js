import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import Footer from '../../components/Footer';

const {width, height} = Dimensions.get('window');

const imageData = [
  require('../../assests/IMG5.png'),
    require('../../assests/IMG6.png'),
    require('../../assests/IMG7.png'),
  // Add more images as needed
];

const TermAndConditionsScreen2 = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assests/Vector.png')}
            style={styles.bellImage}
          />
        </TouchableOpacity>

        <Text style={{fontSize: 20, color: '#3D4C5E'}}>IFZA T&C</Text>
        <Image
          source={require('../../assests/bell.png')}
          style={styles.bellImage}
        />
      </View>
      <Text style={{position:'relative',right:'20%',top:"5%"}}>TERMS & CONDITIONS</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          {imageData.map((source, index) => (
            <Image key={index} source={source} style={styles.image} />
          ))}
        </View>
        
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonContainerbtn}
             onPress={() => navigation.navigate('pepCheck')}
        >
          <ImageBackground
            source={require('../../assests/rectangleButton.png')}
            style={styles.imageBackground}>
            <Text style={styles.buttonTextfoot}>Accept & Continue</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top:"5%"
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 2,
  },
  image: {
    height: height * 0.68,
    width: width * 1,
    resizeMode: 'contain',
    // Styles for the image will be set dynamically
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
    top: '10%',
    width: '113%',
    alignItems: 'center',
    marginBottom: '4%',
  },
  bellImage: {},
  buttonContainer: {
    marginTop: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainerbtn: {
    width: width * 0.86,
    height: height * 0.06,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 5,
    marginBottom: '22%',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextfoot: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TermAndConditionsScreen2;
