import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import CustomButton from '../../components/CustomeButton';

function OnboardingScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assests/sliderbg.png')}
        style={styles.image}
      />
      <Image
        source={require('../../assests/TLZ-Logo.png')}
        style={styles.logoimage}
      />

      {/*<TouchableOpacity style={styles.button} onPress={() => navigation.replace('imageUpload')}>
        <Text style={styles.buttonText}>Web View</Text>
      </TouchableOpacity>*/}

      <CustomButton
        buttonStyle={{width: '70%', marginTop: '8%'}}
        title="Log in"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
  },
  logoimage: {
    width: '90%',
    height: '15%',
    resizeMode: 'contain',
  },

  button: {
    backgroundColor: '#074E76',
    paddingVertical: 5,
    paddingHorizontal: '20%',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
