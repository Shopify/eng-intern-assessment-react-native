import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

// Import the StopWatchButton component for controlling stopwatch actions
import StopWatchButton from './StopWatchButton';

// Define the StopWatch component
export default function StopWatch() {
  // State to track the elapsed time
  const [time, setTime] = useState(0);
  // State to track whether the stopwatch is running
  const [isOn, setIsOn] = useState(false);
  // State to store recorded laps
  const [laps, setLaps] = useState<number[]>([]);

  // Effect hook to handle the interval for updating time
  useEffect(() => {
    let interval: number;

    // Start the interval when isOn is true
    if (isOn) {
      interval = setInterval(() => {
        // Update the time every second
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    // Clear the interval when isOn changes
    return () => clearInterval(interval);
  }, [isOn]);

  // Function to start the stopwatch
  const startStopwatch = () => {
    setIsOn(true);
  };

  // Function to stop the stopwatch
  const stopStopwatch = () => {
    setIsOn(false);
  };

   // Function to reset the stopwatch
  const resetStopwatch = () => {
    setIsOn(false); // Stop the interval
    setTime(0);     // Reset the time
    setLaps([]);    // Clear recorded laps
  };
  // Function to record a lap
  const recordLap = () => {
    // Save the current time in the laps array
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  // Render the StopWatch component
  return (
    <View>
      {/* Display the elapsed time */}
      <Text>{time}</Text>
      {/* Render the StopWatchButton component with appropriate callback functions */}
      <StopWatchButton
        onStart={startStopwatch}
        onStop={stopStopwatch}
        onReset={resetStopwatch}
        onRecordLap={recordLap}
      />

      {/* Display recorded laps if there are any */}
      {laps.length > 0 && (
        <View>
          <Text>Laps:</Text>
          {/* Map through laps and display lap information */}
          {laps.map((lap, index) => (
            <Text key={index + 1}>{`Lap ${index + 1}: ${lap}`}</Text>
          ))}
        </View>
      )}
    </View>
  );
}