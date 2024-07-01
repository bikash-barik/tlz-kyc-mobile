import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const labels = ["Step 1", "Step 2", "Step 3", "Finish"];
const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#074E76',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#074E76',
  stepStrokeUnFinishedColor: '#dedede',
  separatorFinishedColor: '#074E76',
  separatorUnFinishedColor: '#dedede',
  stepIndicatorFinishedColor: '#074E76',
  stepIndicatorUnFinishedColor: '#dedede',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#074E76',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#999999',
  labelColor: 'transparent',  
  labelSize: 0,
  currentStepLabelColor: 'transparent',  
};

const Stepper = ({ currentPosition }) => (
  <View style={styles.container}>
    <StepIndicator
      customStyles={customStyles}
      currentPosition={currentPosition}
      stepCount={4}
      labels={[]}  // Disable default labels
    />
    <View style={styles.labelsContainer}>
      {labels.map((label, index) => (
        <Text
          key={index}
          style={[
            styles.label,
            currentPosition === index && styles.currentLabel,
          ]}
        >
          {label}
        </Text>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  label: {
    fontSize: 13,
    color: '#999999',
    textAlign: 'center',
    flex: 1,
  },
  currentLabel: {
    color: '#074E76',
    fontWeight: 'bold',
  },
});

export default Stepper;
