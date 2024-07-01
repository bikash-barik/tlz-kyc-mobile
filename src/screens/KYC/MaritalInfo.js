import React, { useState, useEffect } from 'react';
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
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import bell from '../../assests/bell.png'; // Make sure this path is correct
import Stepper from '../../utils/Stepper';
import Footer from '../../components/Footer';
import { MARITIALINFO, storeData } from '../../utils/storage';
import vectorimg from '../../assests/Vector.png';
import ProgressBar from '../../components/ProgressBar';

const { width, height } = Dimensions.get('window');

const MaritalInfo = ({ navigation }) => {
  const [maritalStatus, setMaritalStatus] = useState('');
  const [spouseName, setSpouseName] = useState('');
  const [spouseNationality, setSpouseNationality] = useState('');
  const [spouseDob, setSpouseDob] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const saveMaritalInfo = () => {
    storeData(MARITIALINFO, {
      maritalStatus,
      spouseName,
      spouseNationality,
      spouseDob,
    })
      .then(() => {
        navigation.navigate('familyBackground');
      })
      .catch(err => {
        Alert.alert('Error', 'Something went wrong');
      });
  };

  console.log(maritalStatus);
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
            progress={0.54}
            label="Progress"
            height={20}
            color="#004A70"
            unfilledColor="#E0E0E0"
          />
        </View>
        <View style={{ marginLeft: '5%', marginTop: '-2%' }}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: '#1D242D' }}>
            Marital Information
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Marital Status</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={maritalStatus}
              onValueChange={itemValue => setMaritalStatus(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Marital Status" value="" />
              <Picker.Item label="Single" value="single" />
              <Picker.Item label="Married" value="married" />
              <Picker.Item label="Divorced" value="divorced" />
              <Picker.Item label="Widowed" value="widowed" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Spouse Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={spouseName}
            onChangeText={setSpouseName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Spouse Nationality</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={spouseNationality}
            onChangeText={setSpouseNationality}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Spouse DOB</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#909DAD"
            value={spouseDob}
            onChangeText={setSpouseDob}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonContainerbtn}
            onPress={saveMaritalInfo}
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
        <Footer navigation={navigation} />
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
  pickerContainer: {
    backgroundColor: '#eef0f1',
    borderRadius: 8,
    marginTop: '4%',
    width: '90%',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default MaritalInfo;
