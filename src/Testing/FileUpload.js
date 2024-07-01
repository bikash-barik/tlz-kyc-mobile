import React, { useState } from 'react';
import { View, Button, Text, Alert, PermissionsAndroid, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
 
const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your file storage',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};
 
const FileUpload = () => {
  const [fileName, setFileName] = useState(null);
  const [fileUri, setFileUri] = useState(null);
 
  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
 
      setFileName(res.name);
      setFileUri(res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Cancelled');
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
 
  const saveFileLocally = async () => {
    if (!fileUri) {
      Alert.alert('Please select a file first');
      return;
    }
 
    try {
      const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      await RNFS.copyFile(fileUri, destPath);
      Alert.alert('File saved locally at: ' + destPath);
    } catch (err) {
      console.error(err);
      Alert.alert('Error saving file locally: ' + err.message);
    }
  };
 
  return (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<Button title="Request Storage Permission" onPress={requestStoragePermission} />
<Button title="Pick a File" onPress={pickFile} />
      {fileName && (
<Text style={{ marginVertical: 20 }}>
          Selected File: {fileName}
</Text>
      )}
<Button title="Save File Locally" onPress={saveFileLocally} />
</View>
  );
};
 
export default FileUpload;