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
import bell from '../../assests/bell.png';
import Stepper from '../../utils/Stepper';
import Footer from '../../components/Footer';
import { FAMILYINFO, storeData } from '../../utils/storage';
import vectorimg from '../../assests/Vector.png';
import ProgressBar from '../../components/ProgressBar';

const { width, height } = Dimensions.get('window');

const FamilyBackground = ({ navigation }) => {
  const [mothersname, setMothersName] = useState('');
  const [mothersnationality, setMothersNationality] = useState('');
  const [fathersname, setFatherName] = useState('');
  const [fathersnationality, setFathersNationality] = useState('');
  const [isUAEResident, setIsUAEResident] = useState(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // Refs for focusing next TextInput
  const mothersNationalityRef = useRef(null);
  const fathersNameRef = useRef(null);
  const fathersNationalityRef = useRef(null);

  const saveFamilyInfo = () => {
    storeData(FAMILYINFO, {
      mothersname,
      mothersnationality,
      fathersname,
      fathersnationality,
      isUAEResident,
    })
      .then(() => {
        navigation.navigate('emirateidUpload');
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
            progress={0.63}
            label="Progress"
            height={20}
            color="#004A70"
            unfilledColor="#E0E0E0"
          />
        </View>
        <View style={{ marginLeft: '5%', marginTop: '-2%' }}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: '#1D242D' }}>
            Family Background
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Mother's Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={mothersname}
            onChangeText={setMothersName}
            onSubmitEditing={() => mothersNationalityRef.current.focus()}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Mother's Nationality</Text>
          <TextInput
            ref={mothersNationalityRef}
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={mothersnationality}
            onChangeText={setMothersNationality}
            onSubmitEditing={() => fathersNameRef.current.focus()}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Father's Full Name</Text>
          <TextInput
            ref={fathersNameRef}
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={fathersname}
            onChangeText={setFatherName}
            onSubmitEditing={() => fathersNationalityRef.current.focus()}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Father's Nationality</Text>
          <TextInput
            ref={fathersNationalityRef}
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={fathersnationality}
            onChangeText={setFathersNationality}
            onSubmitEditing={() => Keyboard.dismiss()} // Dismiss keyboard after last input
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Is UAE Resident</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setIsUAEResident(true)}>
              <View style={styles.radioOuter}>
                {isUAEResident === true && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setIsUAEResident(false)}>
              <View style={styles.radioOuter}>
                {isUAEResident === false && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>No</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonContainerbtn}
            onPress={saveFamilyInfo}>
            <ImageBackground
              source={require('../../assests/rectangleButton.png')}
              style={styles.imageBackground}>
              <Text style={styles.buttonTextfoot}>Continue</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {!keyboardOpen && (
        <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <Footer navigation={navigation} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  radioGroup: {
    flexDirection: 'row',
    marginTop: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#546881',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#546881',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#546881',
  },
});

export default FamilyBackground;
