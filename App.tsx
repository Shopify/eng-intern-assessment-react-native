import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Stopwatch from './src/Stopwatch';
import { useStopwatch } from './src/hooks/useStopwatch';
import * as Font from 'expo-font';

export default function App() {
  const { time, start, stop, pause, reset, lap, lapTimes, isRunning, showTime, hasStarted } = useStopwatch();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Roboto': require('./fonts/Roboto-Regular.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <View style={styles.container}>
      <Stopwatch
        time={time}
        laps={lapTimes}
        onStart={start}
        onStop={stop}
        onPause={pause}
        onReset={reset}
        onLap={lap}
        showTime={showTime}
        isRunning={isRunning}
        hasStarted={hasStarted}
      />    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
