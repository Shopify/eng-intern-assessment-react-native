  import React, { useState, useRef, useMemo } from 'react';
  import { ScrollView, StyleSheet, Text, View } from 'react-native';
  import StopwatchButton from './StopWatchButton';

  interface StopWatchProps {
    elapsedTime: number;
  }

  const StopWatch: React.FC<StopWatchProps> = ({ }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const stopwatchRef = useRef<number | null>(null);
    const [laps, setLaps] = useState<number[]>([]);
    const memoizedLaps = useMemo(() => laps, [laps]);

    const handleStartStop = () => {
      if (isRunning) {
        clearInterval(stopwatchRef.current!);
      } else {
        const startTime = Date.now() - elapsedTime;
        stopwatchRef.current = setInterval(() => {
          // Update elapsed time every 100 milliseconds
          setElapsedTime(Date.now() - startTime);
        }, 100);
      }

      setIsRunning(!isRunning);
    };

    const handleReset = () => {
      clearInterval(stopwatchRef.current!);
      setElapsedTime(0);
      setLaps([]);
      setIsRunning(false);
    };

    const handleLap = () => {
      if (isRunning) {
        setLaps((prevLaps) => [...prevLaps, elapsedTime]);
      }
    };

    // Function to format the elapsed time
    const formatTime = (timeInMillis: number) => {
      const totalSeconds = Math.floor(timeInMillis / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      // Ensure two digits for hours, minutes, and seconds
      const formattedHours = hours > 0 ? `${hours}`.padStart(2, '0') + ':' : '00:';
      const formattedMinutes = `${minutes}`.padStart(2, '0') + ':';
      const formattedSeconds = `${seconds}`.padStart(2, '0');

      // Format the time as a string
      return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
    };

    const handleStop = () => {
      clearInterval(stopwatchRef.current!);
      setIsRunning(false);
    };

    return (
      <View style={styles.container}>
        {/* Display the stopwatch */}
        <View style={styles.stopwatchContainer}>
          {/* Display the formatted time */}
          <Text testID="stopwatch-text" style={styles.timer}>
            {formatTime(elapsedTime)}
          </Text>
        </View>

        {/* Display the start/stop, lap, and reset buttons */}
        <StopwatchButton
        isRunning={isRunning}
        elapsedTime={elapsedTime}
        onStartStop={handleStartStop}
        onStop={handleStop}
        onReset={handleReset}
        onLap={handleLap}
        />

        {/* Display the laps */}
        {memoizedLaps.length > 0 && (
          <View style={styles.lapContainer}>
            <ScrollView style={styles.scrollView} testID='lap-list'>
              {memoizedLaps.map((item, index) => (
                <View key={index} style={styles.lapItem}>
                  <Text style={styles.lapText}>{`Lap ${index + 1}: ${formatTime(item)}`}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    stopwatchContainer: {
      alignItems: 'center',
      backgroundColor: '#8CC152',
      padding: 20,
      borderRadius: 10,
    },
    timer: {
      fontSize: 60,
      color: '#fff',
    },
    lapContainer: {
      marginTop: 20,
      width: '100%',
    },
    lapItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    lapText: {
      fontSize: 16,
      color: '#333',
    },
    scrollView: {
      width: '100%',
    },
  });

  export default StopWatch;
