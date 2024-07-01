import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import bell from '../../assests/bell.png';
import Stepper from '../../utils/Stepper';
import ImagePicker from '../../Testing/ImagePicker'; // Assuming this is your custom ImagePicker component
import { IMAGEDATAKEY, storeData } from '../../utils/storage';
import vectorimg from '../../assests/Vector.png';
import ProgressBar from '../../components/ProgressBar';

const { width, height } = Dimensions.get('window');

const ESignScreen = ({ navigation }) => {
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleImage2Select = imageUri => {
    setSelectedImage2(imageUri);
    storeData(IMAGEDATAKEY, imageUri);
  };

  const showSuccessModal = () => {
    setModalMessage('Verification Successful!');
    setShowModal(true);
  };

  const showErrorModal = () => {
    setModalMessage('Verification Failed. Please check details.');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const saveAndContinue = async () => {
    setIsLoading(true); // Show loader
    await storeData('e-sign', selectedImage2?.uri); // Check if selectedImage2 is not null or undefined before accessing its uri
    if (selectedImage2) {
      showSuccessModal();
      setTimeout(() => {
        navigation.navigate('term');
      }, 3000);
    } else {
      showErrorModal();
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={vectorimg} style={styles.bellImage} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, color: '#3D4C5E' }}>KYC & Compliance</Text>
          <Image source={bell} style={styles.bellImage} />
        </View>
        <View style={styles.stepperContainer}>
          <Stepper currentPosition={3} />
        </View>
        <View style={{ width: '100%' }}>
          <ProgressBar
            progress={0.9}
            label="Progress"
            height={20}
            color="#004A70"
            unfilledColor="#E0E0E0"
          />
        </View>

        <View style={styles.passportContainer}>
          <Text style={{ marginBottom: 15, fontWeight: 'bold', color: '#546881' }}>
            Drop your Signature Image
          </Text>
          <ImagePicker
            imagePickerCallback={handleImage2Select}
            captureImage={handleImage2Select}
          />
          <View style={{ marginVertical: '5%' }}>
            {selectedImage2 && (
              <Image
                source={{ uri: selectedImage2.uri }}
                style={{
                  width: width * 0.83,
                  height: 178,
                  position: 'relative',
                  resizeMode: 'contain',
                }}
              />
            )}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={saveAndContinue}>
            <Text style={styles.buttonText}>Save & Continue</Text>
          </TouchableOpacity>
        </View>

        {/* Loader */}
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}

        {/* Modal for success or error */}
        <Modal
          visible={showModal}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{modalMessage}</Text>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
    top: '10%',
    width: '100%',
    alignItems: 'center',
    marginBottom: '6%',
  },
  stepperContainer: {
    marginTop: '3%',
  },
  passportContainer: {
    marginTop: '0%',
    marginLeft: '8%',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonContainerbtn: {
    width: width * 0.79,
    height: height * 0.06,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 5,
  },
  buttonTextfoot: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#074E76',
    padding: 10,
    borderRadius: 5,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#546881',
  },
  modalButton: {
    backgroundColor: '#074E76',
    padding: 10,
    borderRadius: 5,
    width: '80%',
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ESignScreen;
