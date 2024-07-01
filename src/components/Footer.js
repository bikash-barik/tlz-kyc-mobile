import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Footer = ({ navigation, extraStyle = {} }) => {
  return (
    <View style={[styles.footer, extraStyle]}>
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Image source={require('../assests/home1.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.circularbtn}>
        <Image source={require('../assests/bubble.png')} style={styles.iconcir} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('onboarding')}>
        <Image source={require('../assests/people.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60, // adjust as needed
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  icon: {
    width: 50,
    height: 50,
    // add more styles as needed
  },
  iconcir: {
    width: 21,
    height: 21,
    // add more styles as needed
  },
  circularbtn: {
    backgroundColor: '#074E76',
    borderRadius: 50,
    marginBottom: 33,
    padding: 20,
  },
});

export default Footer;
