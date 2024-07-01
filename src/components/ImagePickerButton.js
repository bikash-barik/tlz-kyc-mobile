import React, { useState } from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, Image, Dimensions, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import attach from '../assests/attach.png'; // Ensure the path is correct

const { height, width } = Dimensions.get('window');

const ImagePickerButton = ({ onImageSelect }) => {
  const [imageName, setImageName] = useState('Upload Image');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = result.uri;
      setImageName(uri.split('/').pop());
      onImageSelect(result);
    } else {
      console.log('Image selection canceled or failed.');
      console.log('Result:', result); // Log the result for debugging
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Choose from Gallery', onPress: pickImage },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.borderImage} onPress={showImagePickerOptions}>
        <Image
          source={attach}
          style={{ width: 40, height: 40 }}
        />
        <View style={styles.imageTextCon}>
          <Text style={styles.imageText}>{imageName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  attachContainer: {
    width: "89%",
    height: "37%",
    borderColor: '#eef0f1',
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: '0.5%',
  },
  borderImage: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: '#eef0f1',
    borderWidth: 2,
    borderRadius: 5,
    width: "90%",
    padding: 10,
  },
  imageTextCon:{
    width: "70%",
  },
  imageText: {
    marginLeft: 5,
    color: "#006AFF",
  
  }
});

export default ImagePickerButton;
