import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const labels = [
  'Applications ',
  'Applications 1',
  'Applications 2',
  'KYC & Compliance',
  'Applications 3',
  'Applications 5',
  'Applications 6',
  'Applications 7',
  'Applications 8',
  'Applications 9',
  'Applications 10',
  'Applications 11',
];

const customStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#074E76',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#0E8345',
  stepStrokeUnFinishedColor: '#dedede',
  separatorFinishedColor: '#0E8345',
  separatorUnFinishedColor: '#dedede',
  stepIndicatorFinishedColor: '#0E8345',
  stepIndicatorUnFinishedColor: '#dedede',
  stepIndicatorCurrentColor: '#074E76',
  stepIndicatorLabelFontSize: 10,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#ffffff',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#999999',
  labelColor: 'transparent', // Hide default labels
  labelSize: 0,
  currentStepLabelColor: 'transparent', // Hide default labels
  separatorMargin: 4, // Adjust the gap between steps
};

const Stepper = ({ currentPosition }) => {
  const scrollViewRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (scrollViewRef.current) {
      const stepWidth = 100; // Adjust according to your label container width
      const xOffset = (currentPosition - 1) * stepWidth - screenWidth / 2 + stepWidth / 2;
      scrollViewRef.current.scrollTo({ x: xOffset, animated: true });
    }
  }, [currentPosition]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={scrollViewRef}>
        <View>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            stepCount={11}
            labels={[]} // Disable default labels
          />
          <View style={styles.labelsContainer}>
            {labels.map((label, index) => (
              <View key={index} style={styles.labelContainer}>
                <Text
                  style={[
                    styles.label,
                    currentPosition > index && styles.finishedLabel,
                    currentPosition === index && styles.currentLabel,
                  ]}
                >
                  {currentPosition === index ? label : ""}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom:0
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10, // Adjust horizontal padding
    marginTop: 10,
  },
  labelContainer: {
    width: 60, // Adjust the width of each label container
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    color: '#999999',
    textAlign: 'center',
  },
  currentLabel: {
    color: '#074E76',
    fontWeight: 'bold',
  },
  finishedLabel: {
    color: '#0E8345',
    fontWeight: 'bold',
  },
});

export default Stepper;
