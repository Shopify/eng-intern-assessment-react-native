import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StopwatchButton from './StopWatchButton';
import { useStopwatch } from './hooks/useStopWatch';

function formatNumber(num: number) {
  return String(num).padStart(2, '0');
}

const formatTime = (milliseconds: number) => {
  const hours = formatNumber(Math.floor(milliseconds / 3600000));
  const minutes = formatNumber(Math.floor((milliseconds % 3600000) / 60000));
  const seconds = formatNumber(Math.floor((milliseconds % 60000) / 1000));
  const centiseconds = formatNumber(Math.floor((milliseconds % 1000) / 10));

  return `${hours}:${minutes}:${seconds}.${centiseconds}`;
};

export default function Stopwatch() {

  const stopwatch = useStopwatch();
  return (
    
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.time}>{formatTime(stopwatch.milliseconds)}</Text>
        <StopwatchButton
          onResume={stopwatch.resume}
          onReset={stopwatch.reset}
          onLap={stopwatch.lap}
          onPause={stopwatch.pause}
          isPaused={stopwatch.isPaused}
        />
       <ScrollView 
          style={styles.lapScrollView}>
            {stopwatch.laps.map((lap, index) => (
              <Text key={index} style={styles.lap}>
                Lap {index + 1}: {formatTime(lap)}
              </Text>
            ))}
      </ScrollView> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 56,
    fontWeight: '500',
    marginBottom: 20,
  },
  lapScrollView: {
    maxHeight: 210,
    width: '100%',
    marginTop:'10%',
  },
  lap: {
    fontSize: 18,
    marginTop: 12,
  },
});
