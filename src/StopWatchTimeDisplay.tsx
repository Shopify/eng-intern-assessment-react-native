import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {formatTime} from './utils/timeUtils';

interface StopWatchDisplayProps {
  timeInSeconds: number;
}

export default function StopWatchDisplay(props: StopWatchDisplayProps) {
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
    color: 'black',
    fontWeight: 'bold',
    fontSize: 50,
  },
});
