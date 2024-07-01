import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {PEPCHECK, storeData} from '../../utils/storage';
import vectorimg from '../../assests/Vector.png';
import bell from '../../assests/bell.png';
import Footer from '../../components/Footer';

const {width, height} = Dimensions.get('window');
const PEPCheck = ({navigation}) => {
  const [answers, setAnswers] = useState([
    {id: 1, text: 'Do you currently hold any public position?', answer: null},
    {
      id: 2,
      text: 'Do you have or have you ever had any diplomatic immunity?',
      answer: null,
    },
    {
      id: 3,
      text: 'Do you have a close associate who has held public position in the last 12 months?',
      answer: null,
    },
    {
      id: 4,
      text: 'Did you hold any public position in the last 12 months?',
      answer: null,
    },
    {id: 5, text: 'Have you ever held any public position?', answer: null},
    {
      id: 6,
      text: 'Do you have a relative who has held public position in the last 12 months?',
      answer: null,
    },
    {
      id: 7,
      text: 'Has there been a conviction against you by a court of law?',
      answer: null,
    },
    {
      id: 8,
      text: 'If you have answered yes to any of the questions above please provide details below?',
      answer: null,
    },
  ]);

  const handleRadioChange = (id, value) => {
    const updatedAnswers = answers.map(item =>
      item.id === id ? {...item, answer: value} : item,
    );
    setAnswers(updatedAnswers);
  };

  const storePEPCheck = () => {
    storeData(PEPCHECK, answers)
      .then(() => {
        navigation.navigate('KYCSuccessScreen');
      })
      .catch(error => {
        Alert.alert('Error', 'Something went wrong');
      });
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={vectorimg} style={styles.bellImage} />
          </TouchableOpacity>

          <Text style={{fontSize: 20, color: '#3D4C5E'}}>KYC & Compliance</Text>
          <Image source={bell} style={styles.bellImage} />
        </View>

        <View style={styles.questionsContainer}>
          {answers.map(item => (
            <View key={item.id} style={styles.questionItem}>
              <View style={styles.questionBorder}>
                <Text style={styles.questionText}>{item.text}</Text>
                <View style={styles.divider} />
                <View style={styles.radioButtonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.radioButton,
                      item.answer === true ? styles.radioButtonChecked : null,
                    ]}
                    onPress={() => handleRadioChange(item.id, true)}>
                    {item.answer === true && <View style={styles.radioInner} />}
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.radioLabel,
                      item.answer === true ? styles.radioLabelChecked : null,
                    ]}>
                    Yes
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.radioButton,
                      item.answer === false ? styles.radioButtonChecked : null,
                    ]}
                    onPress={() => handleRadioChange(item.id, false)}>
                    {item.answer === false && (
                      <View style={styles.radioInner} />
                    )}
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.radioLabel,
                      item.answer === false ? styles.radioLabelChecked : null,
                    ]}>
                    No
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Example of Continue button */}

        <TouchableOpacity
          style={styles.buttonContainerbtn}
          onPress={storePEPCheck}>
          <ImageBackground
            source={require('../../assests/rectangleButton.png')}
            style={styles.imageBackground}>
            <Text style={styles.buttonTextfoot}>Save & Continue</Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainerbtn: {
    width: width * 0.87,
    height: height * 0.06,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 5,
    marginBottom: '30%',
    marginLeft: '2%',
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
    padding: 20,
    backgroundColor: '#fff',
    top:"2%"
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    top: '1%',
    width: '100%',
    alignItems: 'center',
    marginBottom: '4%',
  },
  questionsContainer: {
    marginTop: '5%',
    marginLeft: '0%',
  },
  questionItem: {
    marginBottom: 20,
  },
  questionBorder: {
    borderWidth: 1,
    borderColor: '#EEF0F1',
    borderRadius: 8,
    overflow: 'hidden',
    // padding: 16,
  },
  questionText: {
    marginBottom: 16,
    marginLeft: 10,
    fontSize: 16,
    color: '#000', // text color
    paddingHorizontal: '3%',
    paddingVertical: '1%',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '3%',
    backgroundColor: '#EEF0F1',
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  radioButtonChecked: {
    backgroundColor: '#074E76', // background color when checked
    borderColor: '#074E76', // border color when checked
  },
  radioInner: {
    width: 12,
    height: 12,
    backgroundColor: 'white', // inner color when checked
    borderRadius: 6,
  },
  radioLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: '#000', // default text color
  },
  radioLabelChecked: {},
  button: {
    backgroundColor: '#074E76',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    borderBottomColor: '#CED0CE',
    borderBottomWidth: 1,
  },
});

export default PEPCheck;
