import AsyncStorage from '@react-native-async-storage/async-storage';
export const PASSPORTDATAKEY = "passport";
export const IMAGEDATAKEY = "image";
export const PERSONALDETAILS = "personalDetails";
export const CONTACTINFORMATION = "contactInformation";
export const UAEADDRINFO = "uaeAddrInfo";
export const HOMEADDRINFO = "homeAddrInfo";
export const MARITIALINFO = "maritialInfo";
export const FAMILYINFO = "familyInfo";
export const PEPCHECK = "pepCheck";
export const EMIRATESDATA = "emiratesData";


export const storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      console.error('Error storing the data', e);
    }
  };

  export const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // reading error
      console.error('Error retrieving the data', e);
    }
  };
  
  
  