import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import attach from '../assests/attach.png';

const ImagePickerComponent = ({ imagePickerCallback }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const showImagePickerOptions = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    }).then(result => {
      if (!result.cancelled) {
        setSelectedImage(result.uri);
        imagePickerCallback(result);
      }
    });
  };

  return (
    <View>
      <TouchableOpacity style={styles.borderImage} onPress={showImagePickerOptions}>
        <Image source={attach} style={{ width: 40, height: 40 }} />
        <View style={styles.textView}>
          <Text style={styles.imageText}>
            {selectedImage ? selectedImage.split('/').pop() : 'Upload image'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  borderImage: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#eef0f1',
    borderWidth: 2,
    borderRadius: 5,
    width: '90%',
  },
  imageText: {
    color: '#006AFF',
    marginLeft: 5,
  },
  textView: {
    width: '80%',
  },
});

export default ImagePickerComponent;
