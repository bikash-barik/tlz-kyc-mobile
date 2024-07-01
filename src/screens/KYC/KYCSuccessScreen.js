import React, {useEffect, useState} from 'react';
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
  Platform,
  ImageBackground,
} from 'react-native';
import bell from '../../assests/bell.png';
import Stepper from '../../utils/Stepper';
import ImagePickerButton from '../../components/ImagePickerButton';
import axios from 'axios';
import ImagePicker from '../../Testing/ImagePicker';
import attach from '../../assests/success.png';
const {width, height} = Dimensions.get('window');
// import RNFS from 'react-native-fs';
import {
  CONTACTINFORMATION,
  EMIRATESDATA,
  FAMILYINFO,
  HOMEADDRINFO,
  IMAGEDATAKEY,
  MARITIALINFO,
  PASSPORTDATAKEY,
  PEPCHECK,
  PERSONALDETAILS,
  UAEADDRINFO,
  getData,
} from '../../utils/storage';
const KYCSuccessScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [passportInfo, setPassportinfo] = useState(null);
  const [eSign, setEsign] = useState(null);
  const [personalDetails, setPersonalDetails] = useState(null);
  const [contactInformation, setContactInformation] = useState(null);
  const [uaeAddrInfo, setUaeAddrInfo] = useState(null);
  const [homeAddrInfo, setHomeAddrInfo] = useState(null);
  const [maritialInfo, setMaritialInfo] = useState(null);
  const [familyInfo, setFamilyInfo] = useState(null);
  const [pepCheck, setPepCheck] = useState(null);
  const [emiratedData, setEmiratesData] = useState(null);

  const showSuccessModal = () => {
    setModalMessage('Download Completed');
    setShowModal(true);
  };

  const showErrorModal = (massage = '') => {
    if (!massage) {
      setModalMessage('Verification Failed. Please check details.');
    } else {
      setModalMessage(massage);
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const downloadfile = async () => {
    setIsLoading(true); // Show loader
    setTimeout(() => {
      showSuccessModal();
    }, 1000); // 3000 milliseconds = 3 seconds

    setTimeout(() => {
      navigation.navigate('appJourney');
    }, 5000); // 3000 milliseconds = 3 seconds
  };

  useEffect(() => {
    getData(PASSPORTDATAKEY)
      .then(data => {
        setPassportinfo(data);
      })
      .catch(err => {
        console.log(err.message);
      });
    //personal details
    getData(PERSONALDETAILS)
      .then(data => {
        setPersonalDetails(data);
      })
      .catch(err => {
        console.log(err.message);
      });

    // contact info
    getData(CONTACTINFORMATION)
      .then(data => {
        setContactInformation(data);
      })
      .catch(err => {
        console.log(err.message);
      });
    //uae address information
    getData(UAEADDRINFO)
      .then(data => {
        setUaeAddrInfo(data);
      })
      .catch(err => {
        console.log(err.message);
      });
    // home address information
    getData(HOMEADDRINFO)
      .then(data => {
        setHomeAddrInfo(data);
      })
      .catch(err => {
        console.log(err.message);
      });
    // marital information
    getData(MARITIALINFO)
      .then(data => {
        setMaritialInfo(data);
      })
      .catch(err => {
        console.log(err.message);
      });
    // family information
    getData(FAMILYINFO)
      .then(data => {
        setFamilyInfo(data);
      })
      .catch(err => {
        console.log(err.message);
      });
    // get PEP information
    getData(PEPCHECK)
      .then(data => {
        setPepCheck(data);
      })
      .catch(err => {
        console.log(err.message);
      });
    getData(EMIRATESDATA)
      .then(data => {
        setEmiratesData(data);
      })
      .catch(err => {
        console.log(err.message);
      });

    getData(IMAGEDATAKEY)
      .then(data => {
        // console.log(data);
        setEsign(data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  const handleUploadAndDownload = () => {
    setIsLoading(false); // Show loader
    showSuccessModal();
    setTimeout(() => {
      navigation.navigate('appJourney');
    }, 3000);
  }; 
  const handleUploadAndDownload1 = async () => {
    try {
      console.log({
        [PERSONALDETAILS]: personalDetails,
        [CONTACTINFORMATION]: contactInformation,
        [UAEADDRINFO]: uaeAddrInfo,
        [HOMEADDRINFO]: homeAddrInfo,
        [MARITIALINFO]: maritialInfo,
        [FAMILYINFO]: familyInfo,
        [PEPCHECK]: pepCheck,
        [EMIRATESDATA]:emiratedData
      });

      // Prepare the form data
      const formData = new FormData();
      const fileUri = eSign.uri; // Replace with the actual file URI
      const fileType = eSign.type; // Replace with the actual file MIME type
      const fileName = eSign.fileName; // Replace with the actual file name

      // Check if file URI is not null or undefined
      if (fileUri && fileType && fileName) {
        formData.append('sign', {
          uri: fileUri,
          type: fileType,
          name: fileName,
        });
      } else {
        throw new Error('File information is incomplete');
      }

      // Append other form fields as strings
      const fields = {
        title: passportInfo.gender === 'MALE' ? 'Mr' : 'Mrs',
        firstName: passportInfo.given_name,
        middleName: passportInfo.middle_name,
        lastName: passportInfo.surname,
        gender: passportInfo.gender === 'MALE' ? 'Male' : 'Female',
        dob: passportInfo.date_of_birth,
        religion: '', // Religion is not available in source
        nationality: passportInfo.nationality, // Mapping "INDIAN" to "Indian"
        country: passportInfo.country_code, // Assuming country from nationality
        mobile: contactInformation.localMobNumber, // Mobile is not available in source
        email: contactInformation.email, // Email is not available in source
        address: homeAddrInfo.addrLine1,
        passportNo: passportInfo.id_number,
        passport_issue_date: passportInfo.date_of_issue,
        passport_exp_date: passportInfo.date_of_expiry,
        country_of_issue: passportInfo.place_of_issue, // Assuming country from place_of_issue
        maretial_status: maritialInfo.maritalStatus, // Marital status is not available in source
        spouce_name: maritialInfo.spouseName,
        spouce_nationality: maritialInfo.spouseNationality, // Spouse nationality is not available in source
        spouce_dob: maritialInfo.spouseDob, // Spouse date of birth is not available in source
        mother_full_name: familyInfo.mothersname,
        mother_nationality: familyInfo.mothersnationality, // Mother's nationality is not available in source
        father_full_name: familyInfo.fathersname,
        father_nationality: familyInfo.fathersnationality, // Father's nationality is not available in source
        father_residence_status: familyInfo.isUAEResident
          ? 'UAE'
          : 'Non-resident', // Father's residence status is not available in source
        emirates_number: emiratedData.emiratesId, // Emirates number is not available in source
        emirates_issue_date: emiratedData.emiratesIssueDate, // Emirates issue date is not available in source
        kyc_emirates_exp_date: emiratedData.emiratesExpiryDate, // Emirates exp date is not available in source
        DO_YOU_CURRENTLY_HOLD_ANY_PUBLIC_POSITION: pepCheck[0].answer
          ? 'Yes'
          : 'No',
        DO_YOU_HAVE_OR_HAVE_YOU_EVER_HAD_ANY_DIPLOMATIC_IMMUNITY: pepCheck[1]
          .answer
          ? 'Yes'
          : 'No',
        DO_YOU_HAVE_A_CLOSE_ASSOCIATE_WHO_HAS_HELD_PUBLIC_POSITION_IN_THE_LAST_12_MONTHS:
          pepCheck[2].answer ? 'Yes' : 'No',
        DID_YOU_HOLD_ANY_PUBLIC_POSITION_IN_THE_LAST_12_MONTHS: pepCheck[3]
          .answer
          ? 'Yes'
          : 'No',
        HAVE_YOU_EVER_HELD_ANY_PUBLIC_POSITION: pepCheck[4].answer
          ? 'Yes'
          : 'No',
        DO_YOU_HAVE_A_RELATIVE_WHO_HAS_HELD_PUBLIC_POSITION_IN_THE_LAST_12_MONTHS:
          pepCheck[5].answer ? 'Yes' : 'No',
        HAS_THERE_BEEN_A_CONVICTION_AGAINST_YOU_BY_A_COURT_OF_LAW: pepCheck[6]
          .answer
          ? 'Yes'
          : 'No',
        IF_YOU_HAVE_ANSWERED_YES_TO_ANY_OF_THE_QUESTIONS_ABOVE_PLEASE_PROVIDE_DETAILS_BELOW:
          pepCheck[7]?"Yes":"N/A",
      };


      // Append fields to formData
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      setIsLoading(true);
      // Send the form data
      const response = await axios.post(
        'https://tjz-backend-kyc.onrender.com/api/v1/generateKycPdf',
        // 'https://lmprm421-3001.inc1.devtunnels.ms/api/v1/generateKycPdf',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob', // Correct response type for binary data
        },
      );

      // Utility function to convert blob to base64
      const blobToBase64 = blob => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result.split(',')[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      };

      // Convert response data to base64
      const base64Data = await blobToBase64(response.data);
console.log(base64Data);
      // Create a path to save the PDF
      // const path =
      //   Platform.OS === 'android'
      //     ? `${RNFS.DownloadDirectoryPath}/downloaded${Date.now()}.pdf`
      //     : `${RNFS.DocumentDirectoryPath}/downloaded.pdf`;

          //Permissions
          
          
              showSuccessModal();
            

      // Save the PDF to the file system
      // RNFS.writeFile(path, base64Data, 'base64')
      //   .then(() => {
      //     setIsLoading(false); // Show loader
      //     showSuccessModal();
      //     setTimeout(() => {
      //       navigation.navigate('appJourney');
      //     }, 3000);
      //   })
      //   .catch(e => {
      //     setIsLoading(false);
      //     showErrorModal(e.massage);
      //   });
    } catch (error) {
      console.error('Error uploading file or downloading PDF:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1}}>
        <View style={styles.headerContainer}>
          <Text style={{fontSize: 17, fontWeight: '400',color:'#546881'}}>
            KYC & Compliance
          </Text>
          <Image source={bell} style={{position: 'relative', left: 70}} />
        </View>
      

        <View style={styles.passportContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.congratetext}>Congrats!</Text>
          </View>

          <View style={styles.headerContainer}>
            <Image
              source={attach}
              style={{
                width: width * 0.83,
                height: 178,
                position: 'relative',
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.completetext}>
              Congratulations! The application process is completed!
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonContainerbtn}
            onPress={handleUploadAndDownload}>
            <ImageBackground
              source={require('../../assests/rectangleButton.png')}
              style={styles.imageBackground}>
              <Text style={styles.buttonTextfoot}>
              Download Compliance
              </Text>
            </ImageBackground>
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
  buttonContainerbtn: {
    width: width * 0.79,
    height: height * 0.06,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 5,
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
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10%',
  },
  congratetext: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 22,
  },
  completetext: {
    width: '80%',
    textAlign: 'center',
    marginVertical: 40,
    color:'#546881'
  },
  stepperContainer: {
    marginTop: '3%',
  },
  passportContainer: {
    display: 'flex',
    marginTop: '8%',
    // marginLeft: '8%',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
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

export default KYCSuccessScreen;
