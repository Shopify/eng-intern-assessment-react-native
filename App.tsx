import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

// The main App component
export default function App() {
    // State for tracking time
    const [time, setTime] = useState<number>(0);
    // State for tracking whether the stopwatch is running
    const [running, setRunning] = useState<boolean>(false);
    // State for storing lap times
    const [laps, setLaps] = useState<number[]>([]);

    // Timer logic to update the time every second when running
    useEffect(() => {
        let interval: ReturnType<typeof setTimeout> | null = null;
        if (running) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => {
            // Clear the interval when the component is unmounted or running state changes
            if (interval) clearInterval(interval);
        };
    }, [running]);

    // Function to start the stopwatch
    const handleStart = () => setRunning(true);
    // Function to stop the stopwatch
    const handleStop = () => setRunning(false);
    // Function to reset the stopwatch
    const handleReset = () => {
        setTime(0);
        setLaps([]);
        setRunning(false);
    };
    // Function to record a lap time
    const handleLap = () => setLaps(prevLaps => [...prevLaps, time]);

    return (
        <View style={styles.container}>
            // Stopwatch display component
            <StopWatch time={time} laps={laps} />
            // Buttons for controlling the stopwatch
            <StopWatchButton
                onStart={handleStart}
                onStop={handleStop}
                onReset={handleReset}
                onLap={handleLap}
            />
        </View>
    );
}

// Styles for the App component
const styles = StyleSheet.create({
  container: {
      flex: 1, // Take up the entire screen
      justifyContent: 'center', // Center content vertically
      alignItems: 'center', // Center content horizontally
      backgroundColor: '#F0F0F0', // Light grey background
  }
});
