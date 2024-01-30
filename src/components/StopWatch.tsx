import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StopwatchButton from './StopWatchButton';
import { useStopWatch } from '../hooks/useStopWatch';

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

export const lapColors = {
  default: 'black',
  minLap: 'red',
  maxLap: '#5ab068'
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
            testID='lap-list'
          >

          {stopwatch.laps.slice().reverse().map((lap, index) => {
            let lapColor = lapColors.default;

            if (stopwatch.laps.length >= 3) {
              if (lap === stopwatch.minLapTime) {
                lapColor = lapColors.minLap;
              }
              else if (lap === stopwatch.maxLapTime) {
                lapColor = lapColors.maxLap;
              }
            }

            return (
              <React.Fragment key={index}>
                <View style={styles.lapContentContainer}>
                  <Text style={[styles.lap, { color: lapColor }]} testID={`lap-${index}`}>
                    Lap {stopwatch.laps.length - index}
                  </Text>
                  <Text style={[styles.lap, { color: lapColor }]} testID={`time-${index}`}>
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
    minWidth:320,
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
