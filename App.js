import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/Home';
import Payment from './src/Payment';
import Biometric from './src/Biometric';
import Verification from './src/Verification';
import Login from './src/Login';
import Admin from './src/Admin';
import Registration from './src/Registration';
import Confirmation from './src/Confirmation';

import LoginScreen from './src/screens/onboarding/LoginScreen';
import ForgotPasswordScreen from './src/screens/onboarding/ForgotPasswordScreen';
import ApplicationJourney from './src/screens/Dashboard/ApplicationJourney';
import PassportVerification from './src/Testing/PassportVerification';
import ExtractedPassportInfo from './src/components/ExtractedPassportInfo';

import ESignScreen from './src/screens/KYC/ESignScreen';
import KYCSuccessScreen from './src/screens/KYC/KYCSuccessScreen';
import PersonalDetails from './src/screens/KYC/PersonalDetails';
import ContactInformation from './src/screens/KYC/ContactInformation';
import UaeAddrInfo from './src/screens/KYC/UaeAddrInfo';
import HomeAddrInfo from './src/screens/KYC/HomeAddrInfo';
import MaritalInfo from './src/screens/KYC/MaritalInfo';
import FamilyBackground from './src/screens/KYC/FamilyBackground';
import EmiratesIdUpload from './src/screens/KYC/EmiratesIdUpload';
import PEPCheck from './src/screens/KYC/PEPCheck';
import TermAndConditionsScreen from './src/screens/Dashboard/TermAndConditionsScreen';
import TermsAndConditions2 from './src/screens/Dashboard/TermsAndConditions2';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Helvetica Neue': require('./assets/fonts/HelveticaNeue.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="appJourney" component={ApplicationJourney} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Biometric" component={Biometric} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="CaptureYourLivePhoto" component={Registration} />
        <Stack.Screen name="Confirmation" component={Confirmation} options={{ headerLeft: () => null }} />
        <Stack.Screen name="forgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="passportVerification" component={PassportVerification} options={{ headerShown: false }} />
        <Stack.Screen name="passportData" component={ExtractedPassportInfo} options={{ headerShown: false }} />
        <Stack.Screen name="personalDetails" component={PersonalDetails} options={{ headerShown: false }} />
        <Stack.Screen name="contactInformation" component={ContactInformation} options={{ headerShown: false }} />
        <Stack.Screen name="uaeaddrInfo" component={UaeAddrInfo} options={{ headerShown: false }} />
        <Stack.Screen name="homeAddrInfo" component={HomeAddrInfo} options={{ headerShown: false }} />
        <Stack.Screen name="martialInfo" component={MaritalInfo} options={{ headerShown: false }} />
        <Stack.Screen name="familyBackground" component={FamilyBackground} options={{ headerShown: false }} />
        <Stack.Screen name="emirateidUpload" component={EmiratesIdUpload} options={{ headerShown: false }} />
        <Stack.Screen name="eSignScreen" component={ESignScreen} options={{ headerShown: false }} />
        <Stack.Screen name="term" component={TermAndConditionsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="term2" component={TermsAndConditions2} options={{ headerShown: false }} />
        <Stack.Screen name="pepCheck" component={PEPCheck} options={{ headerShown: false }} />
        <Stack.Screen name="KYCSuccessScreen" component={KYCSuccessScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
