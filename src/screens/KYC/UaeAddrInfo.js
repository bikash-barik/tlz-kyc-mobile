import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import bell from '../../assests/bell.png'; // Make sure this path is correct
import Stepper from '../../utils/Stepper';
import Footer from '../../components/Footer';
import { UAEADDRINFO, storeData } from '../../utils/storage';
import vectorimg from '../../assests/Vector.png';
import ProgressBar from '../../components/ProgressBar';

const { width, height } = Dimensions.get('window');

const UaeAddrInfo = ({ navigation }) => {
  const [addrLine1, setAddrLine1] = useState('');
  const [addrLine2, setAddrLine2] = useState('');
  const [poBox, setPoBox] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [country, setCountry] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const refs = useRef([]);

  const saveUaeAddrInfo = function () {
    storeData(UAEADDRINFO, {
      addrLine1,
      addrLine2,
      poBox,
      postalCode,
      city,
      stateProvince,
      country,
    })
      .then(() => {
        navigation.navigate('homeAddrInfo');
      })
      .catch(err => {
        Alert.alert('Error', 'Something went wrong');
      });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const focusNextField = (index) => {
    if (index < refs.current.length - 1) {
      refs.current[index + 1].focus();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={vectorimg} style={styles.bellImage} />
          </TouchableOpacity>

          <Text style={{ fontSize: 20, color: '#3D4C5E' }}>KYC & Compliance</Text>
          <Image source={bell} style={styles.bellImage} />
        </View>
        <View style={{ marginTop: '10%' }}>
          <Stepper currentPosition={3} />
        </View>
        <View style={{ width: width }}>
          <ProgressBar
            progress={0.36}
            label="Progress"
            height={20}
            color="#004A70"
            unfilledColor="#E0E0E0"
          />
        </View>
        <View style={{ marginLeft: '5%', marginTop: '-2%' }}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: '#1D242D' }}>
            UAE Address Information
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Address Line 1</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={addrLine1}
            onChangeText={setAddrLine1}
            ref={(el) => (refs.current[0] = el)}
            onSubmitEditing={() => focusNextField(0)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Address Line 2</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={addrLine2}
            onChangeText={setAddrLine2}
            ref={(el) => (refs.current[1] = el)}
            onSubmitEditing={() => focusNextField(1)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>PO Box</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={poBox}
            onChangeText={setPoBox}
            ref={(el) => (refs.current[2] = el)}
            onSubmitEditing={() => focusNextField(2)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Postal Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={postalCode}
            onChangeText={setPostalCode}
            ref={(el) => (refs.current[3] = el)}
            onSubmitEditing={() => focusNextField(3)}
            returnKeyType="next"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={city}
            onChangeText={setCity}
            ref={(el) => (refs.current[4] = el)}
            onSubmitEditing={() => focusNextField(4)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>State Province</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={stateProvince}
            onChangeText={setStateProvince}
            ref={(el) => (refs.current[5] = el)}
            onSubmitEditing={() => focusNextField(5)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Country</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={country}
            onChangeText={setCountry}
            ref={(el) => (refs.current[6] = el)}
            onSubmitEditing={Keyboard.dismiss}
            returnKeyType="done"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonContainerbtn}
            onPress={saveUaeAddrInfo}>
            <ImageBackground
              source={require('../../assests/rectangleButton.png')}
              style={styles.imageBackground}>
              <Text style={styles.buttonTextfoot}>Continue</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {!keyboardOpen && <Footer />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainerbtn: {
    width: width * 0.85,
    height: height * 0.06,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 5,
    marginBottom: '20%',
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
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
    top: '10%',
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginLeft: '5%',
    marginTop: '3%',
  },
  inputLabel: {
    color: '#546881',
    fontWeight: '500',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#eef0f1',
    paddingTop: 10,
    paddingRight: 12,
    paddingBottom: 10,
    paddingLeft: 12,
    borderRadius: 8,
    marginTop: '2%',
    width: '90%',
    color: '#546881',
  },
  button: {
    backgroundColor: '#074E76',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    marginLeft: '11%',
    width: '80%',
    alignItems: 'center',
    marginBottom: '20%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default UaeAddrInfo;
