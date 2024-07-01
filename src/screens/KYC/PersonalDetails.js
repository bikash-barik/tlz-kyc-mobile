import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Dimensions,
  Keyboard,
  Platform,
} from 'react-native';
import bell from '../../assests/bell.png'; // Make sure this path is correct
import Stepper from '../../utils/Stepper';
import Footer from '../../components/Footer';
import vectorimg from '../../assests/Vector.png';
import {
  PASSPORTDATAKEY,
  PERSONALDETAILS,
  getData,
  storeData,
} from '../../utils/storage';
import ProgressBar from '../../components/ProgressBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAvoidingView } from 'react-native';

const { width, height } = Dimensions.get('window');

const PersonalDetails = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [currentNationality, setCurrentNationality] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const refs = useRef([]);

  const savePersonalInfo = function () {
    storeData(PERSONALDETAILS, {
      firstName,
      middleName,
      lastName,
      gender,
      dob,
      currentNationality,
    })
      .then(() => {
        navigation.navigate('contactInformation');
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

  useEffect(() => {
    getData(PASSPORTDATAKEY).then(data => {
      setFirstName(data.given_name);
      setMiddleName(data.middle_name);
      setLastName(data.surname);
      setGender(data.gender);
      setDob(data.date_of_birth);
      setCurrentNationality(data.nationality);
    });
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
        <View style={{ width: width }}>
          <ProgressBar
            progress={0.18}
            label="Progress"
            height={20}
            color="#004A70"
            unfilledColor="#E0E0E0"
          />
        </View>
        <View style={{ marginLeft: '5%', marginTop: '-2%' }}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: '#1D242D' }}>
            Personal Details
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={firstName}
            onChangeText={setFirstName}
            ref={(el) => (refs.current[0] = el)}
            onSubmitEditing={() => focusNextField(0)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Middle Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={middleName}
            onChangeText={setMiddleName}
            ref={(el) => (refs.current[1] = el)}
            onSubmitEditing={() => focusNextField(1)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={lastName}
            onChangeText={setLastName}
            ref={(el) => (refs.current[2] = el)}
            onSubmitEditing={() => focusNextField(2)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Gender</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={gender}
            onChangeText={setGender}
            ref={(el) => (refs.current[3] = el)}
            onSubmitEditing={() => focusNextField(3)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Date Of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#909DAD"
            value={dob}
            onChangeText={setDob}
            ref={(el) => (refs.current[4] = el)}
            onSubmitEditing={() => focusNextField(4)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Current Nationality</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={currentNationality}
            onChangeText={setCurrentNationality}
            ref={(el) => (refs.current[5] = el)}
            onSubmitEditing={() => focusNextField(5)}
            returnKeyType="done"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonContainerbtn}
            onPress={savePersonalInfo}
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
      {!keyboardOpen && <Footer />}
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
    top: '10%',
    width: '100%',
    alignItems: 'center',
  },
  bellImage: {
    // marginLeft: '8%',
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

export default PersonalDetails;
