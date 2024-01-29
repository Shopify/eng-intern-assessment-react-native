import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

export default function App() {
    const [time, setTime] = useState<number>(0);
    const [running, setRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);

    // Timer logic
    useEffect(() => {
        let interval: ReturnType<typeof setTimeout> | null = null;
        if (running) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [running]);

    const handleStart = () => setRunning(true);
    const handleStop = () => setRunning(false);
    const handleReset = () => {
        setTime(0);
        setLaps([]);
        setRunning(false);
    };
    const handleLap = () => setLaps(prevLaps => [...prevLaps, time]);

    return (
        <View style={styles.container}>
            <StopWatch time={time} laps={laps} />
            <StopWatchButton
                onStart={handleStart}
                onStop={handleStop}
                onReset={handleReset}
                onLap={handleLap}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0F0F0',
  }
});
