import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StopwatchButton from './StopWatchButton';

interface StopwatchProps {}

const Stopwatch: React.FC<StopwatchProps> = () => {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  
  const timerRef = useRef<number | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const toggleTimer = () => {
    if (running) {
      stopTimer();
    } else {
      startTimer();
    }
    setRunning(!running);
  };

  const resetTimer = () => {
    stopTimer();
    setTime(0);
    setLapTimes([]);
    setRunning(false);
  };

  const recordLap = () => {
    setLapTimes((prevLapTimes) => [time, ...prevLapTimes]);
  };

  const formatTime = (time: number): string => {
    const padZero = (num: number) => (num < 10 ? '0' + num : num.toString());

    const hours = padZero(Math.floor(time / 3600));
    const minutes = padZero(Math.floor((time % 3600) / 60));
    const seconds = padZero(Math.floor(time % 60));

    return `${hours}:${minutes}:${seconds}`;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 200,
    },
    timer: {
      textAlign: 'center',
      fontSize: 64,
      fontWeight: '500',
    },
  });

  useEffect(() => {
    if (running) {
      startTimer();
    }

    return stopTimer;
  }, [running]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.timer}>{formatTime(time)}</Text>
      </View>
      <View>
        <StopwatchButton label="Lap" onPress={recordLap} />
        <StopwatchButton label={running ? "Stop" : "Start"} onPress={toggleTimer} />
        <StopwatchButton label={running ? "Pause" : "Resume"} onPress={toggleTimer} />
        <StopwatchButton label="Reset" onPress={resetTimer} />
      </View>
      <ScrollView>
        {lapTimes.length > 0 && (
          <View testID="lap-list">
            {lapTimes.map((item, index) => (
              <Text key={index}>{formatTime(item)}</Text>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Stopwatch;
