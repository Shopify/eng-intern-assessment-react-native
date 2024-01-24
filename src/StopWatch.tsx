import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { useEffect, useState } from 'react';
import displayTime from './utils/DisplayTime';

/**
 * Stopwatch component for measuring time and recording laps.
 */
export default function StopWatch() {
  // State variables
  // To check if stopwatch is running
  const [isOn, setIsOn] = useState(false);
  // To keep track of time
  const [time, setTime] = useState(0);
  // To keep track of last time
  const [lastTime, setLastTime] = useState(0);
  // To keep track of laps
  const [laps, setLaps] = useState<{[key: string]: string}>({});

  /**
   * Effect hook for handling the interval timer when the stopwatch is running.
   * It increments the time every second when the stopwatch is active.
   */
  useEffect(() => {
    let timeInterval: number | undefined;

    if (isOn) {
      timeInterval = setInterval(() => {
        setTime((lastTime) => lastTime + 1);
      }, 1000);
    }
    else if (timeInterval) {
      clearInterval(timeInterval);
    }

    // Cleanup function to clear the interval when the component unmounts or is updated
    return () => {
      if (timeInterval) {
        clearInterval(timeInterval)
      }
    };
  }, [isOn]);

  /**
   * Handles the start/stop functionality of the stopwatch.
   * If the stopwatch is running and stop is clicked, it stops and resets the time to 00:00:00. 
   * It starts running if start is clicked when time is 00:00:00.
   */
  const startStop = () => {
    if (isOn) {
      setTime(0);
      setIsOn(false);
    }
    else if (time===0){
      setIsOn(true);
    }
  };

  /**
   * Handles the pause/resume functionality of the stopwatch.
   * If the time is not zero, it toggles between pausing and resuming the stopwatch.
   */
  const pauseResume = () => {
    if (time!==0) {
      setIsOn(!isOn);
    }
  }

  /**
   * Resets the stopwatch, clearing the time and lap records.
   */
  const reset = () => {
    setIsOn(false);
    setTime(0);
    setLaps({});
  };

  /**
   * Records a lap time if the stopwatch is running.
   * It adds a new lap entry with the format "LapX: hh:mm:ss" to the laps state.
   */
  const lap = () => {
    if(isOn) {
      setLaps((previousLaps) => ({
        [`Lap${Object.keys(previousLaps).length + 1}`]: displayTime(time-lastTime), ...previousLaps
      }))
      setLastTime(time)
    }
  };

  // JSX structure for rendering the stopwatch UI
  return (
    <View style={styles.container}>
      <Text style={styles.dialView}>{displayTime(time)}</Text>
      <View style={styles.buttonsRow}>
      <StopWatchButton title={isOn ? 'Stop' : 'Start'} onPress={startStop} background={isOn ? '#3C1715' : '#1B361F'} color={isOn ? '#E33935' : '#50D167'}/>
        <StopWatchButton title={isOn ? 'Pause' : 'Resume'} onPress={pauseResume} background={isOn ? '#3C1715' : '#1B361F'} color={isOn ? '#E33935' : '#50D167'} />
      </View>
      <View style={styles.buttonsRow}>
        <StopWatchButton title='Reset' onPress={reset} color='#FFFFFF' background='#3D3D3D'/>
        <StopWatchButton title='Lap' onPress={lap} color='#FFFFFF' background='#3D3D3D' />
      </View>
      <ScrollView style={styles.scrollView}>
        {Object.entries(laps).length > 0 && (
            <View>
            <View testID='lap-list'>
            {Object.entries(laps).map(([lapKey, lapTime]) => (
              <View style={styles.lap} key={lapKey}>
              <Text style={styles.lapText} >{`${lapKey}:`}</Text>
              <Text style={styles.lapText} >{`${lapTime}`}</Text>
              </View>
            ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// Styles for the Stopwatch component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  dialView: {
    color: '#FFFFFF',
    fontSize: 75,
    fontWeight: '100',
  },
  scrollView: {
    alignSelf: 'stretch'
  },
  buttonsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 10,
  },
  lapText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#151515',
    borderTopWidth: 1,
    paddingVertical: 10,
  },
});