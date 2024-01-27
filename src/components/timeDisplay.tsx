import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {formatTime} from '../utils/timeUtils';

interface TimeDisplayProps {
  timeInSeconds: number;
}

/**
 * Displays the total number of seconds in a more user-friendly HH:MM:SS format
 * making use of formatTime() from timeUtils. When time is -1, this is a 'cleared state' to adhere to the
 * requirements of the testing file for a null state when the stop button is pressed.
 * */
export default function TimeDisplay(props: Readonly<TimeDisplayProps>) {
  const {timeInSeconds} = props;
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={styles.timeText}
      >
        {timeInSeconds === -1 ? '' : formatTime(timeInSeconds)}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    color: '#ecf0f1', // Set text color
    fontWeight: '500',
    fontSize: 50,
    textShadowColor: 'rgb(194,219,239)', // Set text shadow color
    textShadowOffset: { width: 2, height: 2 }, // Set text shadow offset
    textShadowRadius: 5, // Set text shadow radius
  },
});