import React, {useState} from 'react';
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
import ImagePickerButton from '../../components/ImagePickerButton';
import axios from 'axios';
import ImagePicker from '../../Testing/ImagePicker';
import vectorimg from '../../assests/Vector.png';
import Footer from '../../components/Footer';
import ProgressBar from '../../components/ProgressBar';

const {width, height} = Dimensions.get('window');

const PhotoVerifyScreen = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [passportData, setPassportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleImageSelect = imageUri => {
    setSelectedImage(imageUri);
  };

  const handleImage2Select = imageUri => {
    setSelectedImage2(imageUri);
  };

  const handleImage3Select = imageUri => {
    setSelectedImage3(imageUri);
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

  const verify = async () => {
    setIsLoading(true); // Show loader

    const formData = new FormData();
    formData.append('idPhoto', {
      uri: selectedImage.uri,
      name: selectedImage.fileName,
      type: selectedImage.type,
    });

    formData.append('liveImage1', {
      uri: selectedImage2.uri,
      name: selectedImage2.fileName,
      type: selectedImage2.type,
    });

    formData.append('liveImage2', {
      uri: selectedImage3.uri,
      name: selectedImage3.fileName,
      type: selectedImage3.type,
    });

    try {
      const response = await axios.post(
        'https://tjz-backend-kyc.onrender.com/api/v1/photoVerify',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setPassportData(response.data);

      setIsLoading(false); // Hide loader after data is fetched
      if (response.data.status === true) {
        showSuccessModal(); // Call showSuccessModal if status is true
        navigation.navigate('eSignScreen');
      } else {
        showErrorModal(); // Call showErrorModal otherwise
      }

      // navigation.navigate('passport');
    } catch (error) {
      console.error('Error extracting passport info:', error);
      setIsLoading(false); // Hide loader in case of error
      showErrorModal(); // Show error modal
    }
  };

  return (
    <View>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={vectorimg} style={styles.bellImage} />
            </TouchableOpacity>

            <Text style={{fontSize: 20, color: '#3D4C5E'}}>
              KYC & Compliance
            </Text>
            <Image source={bell} style={styles.bellImage} />
          </View>
          <View style={styles.stepperContainer}>
            <Stepper currentPosition={3} />
          </View>
          <View style={{width: '100%'}}>
            <ProgressBar
              progress={0.81}
              label="Progress"
              height={20}
              color="#004A70"
              unfilledColor="#E0E0E0"
            />
          </View>
          <View style={styles.passportContainer}>
            <Text
              style={{marginBottom: 15, fontWeight: 'bold', color: '#546881'}}>
              Identity Proof
            </Text>
            <ImagePickerButton onImageSelect={handleImageSelect} />
            <View style={{marginTop: '2%'}}>
              {selectedImage && (
                <Image
                  source={{uri: selectedImage.uri}}
                  style={{
                    width: width * 0.83,
                    height: 178,
                    position: 'relative',
                  }}
                />
              )}
            </View>
          </View>
          <View style={styles.passportContainer}>
            <Text
              style={{marginBottom: 15, fontWeight: 'bold', color: '#546881'}}>
              Capture Your Live Photo
            </Text>
            <ImagePicker
              imagePickerCallback={handleImage2Select}
              captureImage={handleImage2Select}
            />
            <View style={{marginTop: '3%'}}>
              {selectedImage2 && (
                <Image
                  source={{uri: selectedImage2.uri}}
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
          <View style={styles.passportContainer}>
            <Text
              style={{marginBottom: 15, fontWeight: 'bold', color: '#546881'}}>
              Capture Your Live Photo
            </Text>
            <ImagePicker
              imagePickerCallback={handleImage3Select}
              captureImage={handleImage3Select}
            />
            <View style={{marginTop: '3%'}}>
              {selectedImage3 && (
                <Image
                  source={{uri: selectedImage3.uri}}
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
            <TouchableOpacity style={styles.button} onPress={verify}>
              <Text style={styles.buttonText}>Verify</Text>
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
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={closeModal}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
      <View>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
    top: '4%',
    width: '100%',
    alignItems: 'center',
    marginBottom: '5%',
  },
  stepperContainer: {
    marginTop: '3%',
  },
  passportContainer: {
    marginTop: '8%',
    marginLeft: '8%',
    marginBottom: '3%',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '26%',
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
    color:'#909dad'
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

export default PhotoVerifyScreen;
