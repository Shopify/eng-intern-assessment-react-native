// App.tsx
/// <reference types="node" />


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Stopwatch from './src/StopWatch';

import StopwatchButton from './src/StopWatchButton';

const App: React.FC = () => {
  // State variables to manage the stopwatch functionality
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Effect to update the elapsed time when the stopwatch is running
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    // Clean up the interval when the component is unmounted or isRunning is set to false
    return () => clearInterval(interval);
  }, [isRunning]);

  // Event handler to start the stopwatch
  const handleStart = () => {
    setIsRunning(true);
  };

  // Event handler to stop the stopwatch
  const handleStop = () => {
    setIsRunning(false);
  };

  // Event handler to reset the stopwatch
  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };

  // Event handler to record a lap in the stopwatch
  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, elapsedTime]);
  };

  // Render the main application UI
  return (
    <View style={styles.container}>
      {/* Add an image */}
      <Image
        source={require('./assets/image.png')} // replace with the actual path to your image
        style={styles.logo}
        resizeMode="contain" // Adjust the resizeMode based on your image requirements
      />

      <Text style={styles.title}>Asadullah Mohammed</Text>
      <Text style={styles.title}>Shopify Engineering Assessment</Text>

      <Stopwatch elapsedTime={elapsedTime} />
      <StopwatchButton
        isRunning={isRunning}   // Passes the current running state to determine button behavior
        onStart={handleStart}  // Event handler for the start button
        onStop={handleStop}   // Event handler for the stop button
        onReset={handleReset}   // Event handler for the reset button
        onLap={handleLap}   // Event handler for the lap button
      />
      <View style={styles.lapsContainer}>
        {/* Render laps recorded */}
        {laps.map((lap, index) => (
          <Text key={index} style={styles.lapText}>
            Lap {index + 1}: {lap} seconds
          </Text>
        ))}
      </View>
    </View>
  );
};

// Styles for the main application
const styles = StyleSheet.create({
  // Overall container styling
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9bce39', // Background color of the entire screen
    padding: 20, // Padding for the entire container
  },

  // Logo styling
  logo: {
    width: 200, // width of the image
    height: 200, //  height of the image
    marginBottom: 20, // Margin at the bottom of the logo
  },

  // Title styling
  title: {
    fontSize: 24, // Font size of the title
    fontWeight: 'bold', // Bold font weight
    textAlign: 'center', // Center-align the text
    color: 'black', // Text color
    marginBottom: 20, // Margin at the bottom of the title
  },

  // Stopwatch container styling
  stopwatchContainer: {
    marginBottom: 20, // Margin at the bottom of the stopwatch container
  },

  // Laps container styling
  lapsContainer: {
    marginTop: 20, // Margin at the top of the laps container
  },

  // Lap text styling
  lapText: {
    fontSize: 18, // Font size of the lap text
    fontWeight: 'bold', // Bold font weight
    marginBottom: 10, // Margin at the bottom of each lap text
    color: '#ffffff', // White text color
  },
});


export default App;