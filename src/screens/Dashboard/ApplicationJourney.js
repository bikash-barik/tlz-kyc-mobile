import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Footer from '../../components/Footer';

const {width, height} = Dimensions.get('window');
const tasks = [
  {
    name: 'Package Confirmation',
    progress: 100,
    link: '',
  },
  {
    name: 'Financial Confirmation',
    progress: 100,
    link: '',
  },
  {
    name: 'My Company Details',
    progress: 100,
    link: '',
  },
  {
    name: 'KYC & Compliance',
    progress: 0,
    link: 'passportVerification',
  },

  {
    name: 'Trade Licence Application',
    progress: 60,
    link: '',
  },
  {
    name: 'Registration ID Card Application',
    progress: 50,
    link: '',
  },
  {
    name: 'Immigration & Residency',
    progress: 30,
    link: '',
  },
  {
    name: 'Entity Permit',
    progress: 30,
    link: '',
  },
  {
    name: 'Medical Testing',
    progress: 30,
    link: '',
  },

  {
    name: 'Emirates ID Applications',
    progress: 30,
    link: '',
  },
  {
    name: 'Bank Account Opening',
    progress: 30,
    link: '',
  },
];

const taskImages = {
  'Package Confirmation': require('../../assests/package.png'),
  'Financial Confirmation': require('../../assests/buisness.png'),
  'My Company Details': require('../../assests/buisness.png'),
  'KYC & Compliance': require('../../assests/kyc.png'),
  Payment: require('../../assests/payment.png'),
  'Trade Licence Application': require('../../assests/payment.png'),
  'Registration ID Card Application': require('../../assests/entity.png'),
  'Immigration & Residency': require('../../assests/trade.png'),
  'Entity Permit': require('../../assests/visa.png'),
  'Medical Testing': require('../../assests/visa.png'),
  'Emirates ID Applications': require('../../assests/visa.png'),
  'Bank Account Opening': require('../../assests/visa.png'),
};

const ApplicationJourney = ({navigation}) => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    // Delayed start of animation after 1000ms (1 second)
    const animationTimeout = setTimeout(() => {
      setStartAnimation(true);
    }, 1000);

    return () => clearTimeout(animationTimeout);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowheader}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DocumentVault')}
          style={styles.touchableOpacity}></TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('PersonalDetails')}
          style={styles.touchableOpacity}>
          <Text style={styles.headerText}>Application Journey</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('PersonalDetails')}
          style={styles.touchableOpacity}>
          <Image
            source={require('../../assests/bell.png')}
            style={styles.notification}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.statusContainer}>
        <View>
          <Text style={styles.statusTitle}>Application Status</Text>
          <View style={styles.nextStepsButton}>
            <Text style={styles.nextStepsText}>Next Steps</Text>
          </View>
        </View>
        <View>
          <AnimatedCircularProgress
            size={85}
            width={8}
            fill={78.6}
            tintColor={78.6 === 100 ? '#19C016' : '#fff'}
            backgroundColor="#002940"
            rotation={0}
            lineCap="round">
            {fill => (
              <Text
                style={[
                  styles.progressText,
                  fill === 100 ? styles.greenText : null,
                ]}>
                {`${fill.toFixed(1)}%`}
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        {tasks.map((task, index) => (
          <TouchableOpacity
            key={index}
            style={styles.taskContainer}
            onPress={() => navigation.navigate(task.link)}>
            <View style={styles.column}>
              <View style={styles.imageprogress}>
                <Image source={taskImages[task.name]} style={styles.imagepro} />
              </View>
              <View style={styles.imageprogress}>
                <Text style={styles.taskTitle}>{task.name}</Text>
                <Text style={styles.stepsRemaining}>12 Steps Remaining</Text>
              </View>
            </View>

            <AnimatedCircularProgress
              size={40}
              width={4}
              fill={startAnimation ? task.progress : 0} // Start filling only after startAnimation is true
              tintColor={task.progress === 100 ? '#19C016' : '#002940'}
              backgroundColor="#3498db"
              rotation={0}
              lineCap="round">
              {fill => (
                <Text
                  style={[
                    styles.taskProgressText,
                    task.progress === 100 ? styles.greenText : null,
                  ]}>
                  {`${fill.toFixed(1)}%`}
                </Text>
              )}
            </AnimatedCircularProgress>
          </TouchableOpacity>
        ))}
        <View style={styles.footerbutton}>
          <TouchableOpacity
            style={styles.buttonContainerbtn}
            onPress={() => navigation.navigate('passportVerification')}
            // onPress={() => navigation.navigate('LoginScreen')}
            >
              
            <ImageBackground
              source={require('../../assests/rectangleButton.png')}
              style={styles.imageBackground}>
              <Text style={styles.buttonTextfoot}>Start</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainerbtn: {
    width: width * 0.9,
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rowheader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    paddingHorizontal: 10,
    marginTop: 50,
  },
  touchableOpacity: {
    flex: 1,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '400',
    width: 250,
    color: '#000',
  },
  notification: {
    height: 20,
    width: 20,
    marginLeft: 100,
  },
  column: {
    flexDirection: 'row',
  },
  imageprogress: {
    padding: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    backgroundColor: '#074E76',
    padding: 20,
    margin: 16,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: 'white',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  greenText: {
    color: 'green',
  },
  nextStepsButton: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: "5%",
    borderRadius: 8,
    width: '60%',
  },
  nextStepsText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  taskContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  taskTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
  },
  stepsRemaining: {
    fontSize: 10,
    color: '#888',
  },
  taskProgressText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#397191',
  },
  footerbutton: {
    marginBottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#074E76',
    paddingVertical: 15,
    width: '70%',
    borderRadius: 5,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ApplicationJourney;
