import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Stopwatch from './src/components/Stopwatch/Stopwatch';
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

  // // Render the app UI only after the fonts are loaded
  // if (!fontsLoaded) {
  //   return <View><Text>Loading Fonts...</Text></View>;
  // }

  return (
    <View style={styles.container}>
      <Stopwatch
        fontsLoaded={fontsLoaded}
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
