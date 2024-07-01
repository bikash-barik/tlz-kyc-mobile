import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, buttonStyle, textStyle,navigation }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0B4F6C', // Default blue color
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 50, // High value to make it pill-shaped
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Default white text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
