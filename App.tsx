import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Stopwatch from './src/components/StopWatch/StopWatch';
import { useStopwatch } from './src/hooks/useStopwatch';
import * as Font from 'expo-font';

export default function App() {
  // State and methods from the custom hook for stopwatch functionality.
  const { time, start, stop, pause, reset, lap, lapTimes, isRunning, showTime, hasStarted } = useStopwatch();

  // State to track if custom fonts have been loaded.
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Async function to load fonts.
  const loadFonts = async () => {
    await Font.loadAsync({
      'Roboto': require('./fonts/Roboto-Regular.ttf'),
    });
    setFontsLoaded(true); // Update state once fonts are loaded.
  };

  // Effect hook to load fonts on component mount.
  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <View style={styles.container}>
      {/* Stopwatch component with all necessary props passed down */}
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

// Styles for the App component.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});