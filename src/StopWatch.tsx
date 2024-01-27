import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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

  const format = (time: number): string => {
    let hours: string | number = Math.floor(time / 3600);
    let minutes: string | number = Math.floor((time % 3600) / 60);
    let seconds: string | number = Math.floor(time % 60);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${hours}:${minutes}:${seconds}`;
  };

  const recordLap = () => {
    setLapTimes((prevLapTimes) => [time, ...prevLapTimes]);
  };

  const stopTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    setRunning(false);
    setTime(0)
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 200,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    list:{
      height:100
    },
    timer:{
      textAlign: 'center',
      fontSize: 64,
      fontWeight: '500',
    }
  });
  
  return (
    <View style={styles.container}>
      <View>
      {isTimerActive && <Text style={styles.timer}>{format(time)}</Text>}
      </View>
      <View>
        <StopwatchButton label="Lap" onPress={recordLap} />
        <StopwatchButton
          label={running ? "Stop" : "Start"}
          onPress={() => {
            if (running) {
              stopTimer()
              setIsTimerActive(false)
            }
            else {
              setRunning(true)
              setIsTimerActive(true)
            };
          }}
        />
        <StopwatchButton
          label={running ? "Pause" : "Resume"}
          onPress={() => {
            setRunning(!running);
          }}
        />
        <StopwatchButton
          label='Reset'
          onPress={() => {
            stopTimer();
            setTime(0);
            setLapTimes([]);
          }}
        />
      </View>
      <ScrollView>
        {lapTimes.length ? (
          <View testID='lap-list'>
            {lapTimes.map((item) => (
              <Text key={item}>{format(item)}</Text>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default Stopwatch;
