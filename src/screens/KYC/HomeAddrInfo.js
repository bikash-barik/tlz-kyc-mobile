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
import { HOMEADDRINFO, storeData } from '../../utils/storage';
import vectorimg from '../../assests/Vector.png';
import ProgressBar from '../../components/ProgressBar';

const { width, height } = Dimensions.get('window');

const HomeAddrInfo = ({ navigation }) => {
  const [addrLine1, setAddrLine1] = useState('');
  const [addrLine2, setAddrLine2] = useState('');
  const [poBox, setPoBox] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [country, setCountry] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const addrLine2Ref = useRef(null);
  const poBoxRef = useRef(null);
  const postalCodeRef = useRef(null);
  const cityRef = useRef(null);
  const stateProvinceRef = useRef(null);
  const countryRef = useRef(null);

  const saveHomeAddrInfo = () => {
    storeData(HOMEADDRINFO, {
      addrLine1,
      addrLine2,
      poBox,
      postalCode,
      city,
      stateProvince,
      country,
    })
      .then(() => {
        // Handle success, you can show a confirmation message if needed
        // Alert.alert('Success', 'Address information saved successfully');
        console.log('Address information saved successfully');
        navigation.navigate('martialInfo')
      })
      .catch(err => {
        Alert.alert('Error', 'Something went wrong');
      });
  };

  const handleFocusNextField = (nextFieldRef) => {
    if (nextFieldRef && nextFieldRef.current) {
      nextFieldRef.current.focus();
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
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
        <View style={{ width: '100%' }}>
          <ProgressBar
            progress={0.45}
            label="Progress"
            height={20}
            color="#004A70"
            unfilledColor="#E0E0E0"
          />
        </View>
        <View style={{ marginLeft: '5%', marginTop: '-2%' }}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: '#1D242D' }}>
            Home Address Information
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
            onSubmitEditing={() => handleFocusNextField(addrLine2Ref)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Address Line 2</Text>
          <TextInput
            ref={addrLine2Ref}
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={addrLine2}
            onChangeText={setAddrLine2}
            onSubmitEditing={() => handleFocusNextField(poBoxRef)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>PO Box</Text>
          <TextInput
            ref={poBoxRef}
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={poBox}
            onChangeText={setPoBox}
            onSubmitEditing={() => handleFocusNextField(postalCodeRef)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Postal Code</Text>
          <TextInput
            ref={postalCodeRef}
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={postalCode}
            onChangeText={setPostalCode}
            onSubmitEditing={() => handleFocusNextField(cityRef)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>City</Text>
          <TextInput
            ref={cityRef}
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={city}
            onChangeText={setCity}
            onSubmitEditing={() => handleFocusNextField(stateProvinceRef)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>State Province</Text>
          <TextInput
            ref={stateProvinceRef}
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={stateProvince}
            onChangeText={setStateProvince}
            onSubmitEditing={() => handleFocusNextField(countryRef)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Country</Text>
          <TextInput
            ref={countryRef}
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={country}
            onChangeText={setCountry}
            onSubmitEditing={Keyboard.dismiss}
            returnKeyType="done"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonContainerbtn}
            onPress={saveHomeAddrInfo}
          >
            <ImageBackground
              source={require('../../assests/rectangleButton.png')}
              style={styles.imageBackground}
            >
              <Text style={styles.buttonTextfoot}>Continue</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {!keyboardOpen && (
        <Footer />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '10%',
  },
  inputContainer: {
    width: '100%',
    marginLeft: '5%',
    marginTop: '2%',
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
});

export default HomeAddrInfo;
