import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import {formatTime} from "../utils/timeUtils";

interface TimeDisplayProps {
  timeInSeconds: number;
}

// file for time display component
export default function TimeDisplay(props: Readonly<TimeDisplayProps>) {
  const { timeInSeconds } = props;
  const formattedTime = timeInSeconds === -1 ? '' : formatTime(timeInSeconds);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.timeText}>{formattedTime}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    color: '#ecf0f1',
    fontWeight: '600',
    fontSize: 36, // Adjust font size as needed
    textShadowColor: 'rgb(194,219,239)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
