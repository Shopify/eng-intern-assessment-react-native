import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface StopWatchProps {
  time: number;
}

const StopWatch: React.FC<StopWatchProps> = (props) => {

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor((seconds % 3600) / 60);
    const hrs = Math.floor(seconds / 3600);
    const secondsRemaining = seconds % 60;

    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`;
  }

  return (
    <View style={styles.timeContainer}>
      <Text style={styles.timeText}>
        {formatTime(props.time)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  timeText: {
    color: "#fff",
    fontSize: 24
  }
});

export default StopWatch;