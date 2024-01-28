import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import StopwatchButton from './StopWatchButton';

interface StopwatchProps {}

const Stopwatch: React.FC<StopwatchProps> = () => {
  const [time, setTime] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const [running, setRunning] = useState<boolean>(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      timer.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [running]);

  const formatTime = (time: number): string => {
    let hours: string | number = Math.floor(time / 3600);
    let minutes: string | number = Math.floor((time % 3600) / 60);
    let seconds: string | number = Math.floor(time % 60);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${hours}:${minutes}:${seconds}`;
  };

  const handleRecordLap = () => {
    setLapTimes((prevLapTimes) => [time, ...prevLapTimes]);
  };

  const handleStartStop = () => {
    if (running) {
      stopTimer();
      setIsTimerActive(false);
    } else {
      startTimer();
      setIsTimerActive(true);
    }
  };

  const handlePauseResume = () => {
    setRunning(!running);
  };

  const handleReset = () => {
    stopTimer();
    setTime(0);
    setLapTimes([]);
  };

  const startTimer = () => {
    setRunning(true);
  };

  const stopTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    setRunning(false);
    setTime(0);
  };

  const styles = StyleSheet.create({
    body:{
      alignItems: "center", 
    },
    heading:{
      paddingTop: 20,
      fontSize: 16,
      fontWeight: '500',

    },
    timer: {
      fontSize: 64,
      fontWeight: '500',
      paddingTop: 80
    },
    timerView:{
      paddingBottom: 36,
    },
    buttonView:{
      flexDirection: 'row',
    },
    lap:{
      paddingTop:10,
      width: 300,
    },
    lapItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingVertical: 5,
    },
    lapText: {
      fontSize: 18,
      textAlign: 'center',
      marginVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingVertical: 5,
    },
  });

  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.heading}>Stopwatch</Text>
      <View style={styles.timerView}>
        {isTimerActive && <Text style={styles.timer}>{formatTime(time)}</Text>}
      </View>
      <View style={styles.buttonView}>
        <StopwatchButton label="Lap" onPress={handleRecordLap} />
        <StopwatchButton label={running ? "Stop" : "Start"} onPress={handleStartStop} />
        <StopwatchButton label={running ? "Pause" : "Resume"} onPress={handlePauseResume} />
        <StopwatchButton label='Reset' onPress={handleReset} />
      </View>
      <ScrollView>
        {lapTimes.length ? (
          <View testID='lap-list' style={styles.lap}>
             {lapTimes.slice().reverse().map((item, index) => (
              <View key={index} style={styles.lapItem}>
                <Text style={styles.lapText}>{`Lap ${index + 1}`}</Text>
                <Text style={styles.lapText}>{formatTime(item)}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stopwatch;
