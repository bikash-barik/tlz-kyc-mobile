// ProgressBar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const ProgressBar = ({ progress, label, height = 5, color = "#004A70", unfilledColor = "#E0E0E0" }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.progressContainer}>
      <Progress.Bar 
        progress={progress} 
        width={null} 
        height={height/2} 
        borderRadius={height / 2} // To keep the border radius proportional
        color={color} 
        unfilledColor={unfilledColor}
        borderWidth={0}
      />
      <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
 
  label: {
    marginBottom: 10,
    fontSize: 16,
    color:'#000'
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'right',
    color:'#546881'
  },
});

export default ProgressBar;