import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  Keyboard,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PASSPORTDATAKEY, storeData } from '../utils/storage';
import bell from '../assests/bell.png';
import vectorimg from '../assests/Vector.png';
import Stepper from '../utils/Stepper';
import Footer from './Footer';
import ProgressBar from './ProgressBar';

const { width, height } = Dimensions.get('window');

function ExtractedPassportInfo({ navigation, route }) {
  const extractedData = route.params;
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const refs = useRef([]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
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
    storeData(
      PASSPORTDATAKEY,
      extractedData.passportData.data.result.extraction_output
    );
  }, [extractedData]);

  const focusNextField = (index) => {
    if (index < refs.current.length - 1) {
      refs.current[index + 1].focus();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollViewContainer}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          extraScrollHeight={150}
        >
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={vectorimg} style={styles.bellImage} />
              </TouchableOpacity>

              <Text style={{ fontSize: 20, color: '#3D4C5E' }}>
                KYC & Compliance
              </Text>
              <Image source={bell} style={styles.bellImage} />
            </View>

            <View style={{ width: '100%' }}>
              <Stepper currentPosition={3} />
            </View>
            <View style={{ width: width }}>
              <ProgressBar
                progress={0.09}
                label="Progress"
                height={20}
                color="#004A70"
                unfilledColor="#E0E0E0"
              />
            </View>

            <Text style={styles.forgotText}>Passport Information</Text>

            <Text style={styles.levelText}>Passport Number</Text>
            <TextInput
              style={styles.input}
              placeholder="LM059889"
              placeholderTextColor="#a9a9a9"
              value={
                extractedData.passportData.data.result.extraction_output
                  .id_number
              }
              ref={(el) => (refs.current[0] = el)}
              onSubmitEditing={() => focusNextField(0)}
              returnKeyType="next"
            />

            <Text style={styles.levelText}>Passport Issue Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Date-of-issue"
              placeholderTextColor="#a9a9a9"
              value={
                extractedData.passportData.data.result.extraction_output
                  .date_of_issue
              }
              ref={(el) => (refs.current[1] = el)}
              onSubmitEditing={() => focusNextField(1)}
              returnKeyType="next"
            />

            <Text style={styles.levelText}>Passport Expiry Date</Text>
            <TextInput
              style={styles.input}
              placeholder="expiry"
              placeholderTextColor="#a9a9a9"
              value={
                extractedData.passportData.data.result.extraction_output
                  .date_of_expiry
              }
              ref={(el) => (refs.current[2] = el)}
              onSubmitEditing={() => focusNextField(2)}
              returnKeyType="next"
            />

            <Text style={styles.levelText}>Place Of issue</Text>
            <TextInput
              style={styles.input}
              placeholder="place of issue"
              placeholderTextColor="#a9a9a9"
              value={
                extractedData.passportData.data.result.extraction_output
                  .place_of_issue
              }
              ref={(el) => (refs.current[3] = el)}
              onSubmitEditing={() => focusNextField(3)}
              returnKeyType="next"
            />

            <Text style={styles.levelText}>Country Of issue</Text>
            <TextInput
              style={styles.input}
              placeholder="Country of issue"
              placeholderTextColor="#a9a9a9"
              value={
                extractedData.passportData.data.result.extraction_output
                  .country_code
              }
              ref={(el) => (refs.current[4] = el)}
              onSubmitEditing={() => focusNextField(4)}
              returnKeyType="done"
            />

            <TouchableOpacity
              style={styles.buttonContainerbtn}
              onPress={() => navigation.navigate('personalDetails')}
            >
              <ImageBackground
                source={require('../assests/rectangleButton.png')}
                style={styles.imageBackground}
              >
                <Text style={styles.buttonTextfoot}>Continue</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
      {!keyboardOpen && <Footer style={styles.footer} />}
    </View>
  );
}

export default ExtractedPassportInfo;

const styles = StyleSheet.create({
  buttonContainerbtn: {
    width: width * 0.85,
    height: height * 0.06,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 5,
    marginBottom: 30,
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
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 50, // Increase to ensure the last TextInput is visible
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  forgotText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    alignSelf: 'flex-start',
    color: '#1D242D',
    marginTop: '-2%'
  },
  levelText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
    color: '#546881',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    backgroundColor: '#eef0f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#546881',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    top: '5%',
    width: '100%',
    alignItems: 'center',
    marginBottom: '4%',
  },
  bellImage: {
    // marginLeft: '8%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
