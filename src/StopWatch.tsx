import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StopwatchButton from './StopWatchButton';
import { useStopWatch } from './hooks/useStopWatch';

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

  const stopwatch = useStopWatch();
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
            style={styles.lapScrollView}
            contentContainerStyle={styles.lapScrollViewContent}
          >

          {stopwatch.laps.slice().reverse().map((lap, index) => {
            let lapColor = 'black'; // Default lap color

            if (stopwatch.laps.length >= 3) {
              if (lap === stopwatch.minLapTime) {
                lapColor = 'red'; // Set color to red for minimum lap time
              }
              else if (lap === stopwatch.maxLapTime) {
                lapColor = 'limegreen'; // Set color to green for maximum lap time
              }
            }

            return (
              <React.Fragment key={index}>
                <View style={styles.lapContentContainer}>
                  <Text style={[styles.lap, { color: lapColor }]}>
                    Lap {stopwatch.laps.length - index}
                  </Text>
                  <Text style={[styles.lap, { color: lapColor }]}>
                    {formatTime(lap)}
                  </Text>
                </View>
                <View style={styles.divider} />
              </React.Fragment>
            );
  })}
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
  lapContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'75%',
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
  lapScrollViewContent: {
    alignItems: 'center',
  },
  lap: {
    fontSize: 18,
    marginTop: 12,
  },
  divider: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '75%',
    marginTop:6,
  }
});
