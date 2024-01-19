import { useState, useEffect } from 'react';
import { SafeAreaView, 
        StyleSheet,
        View,
        Text,
       } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { formatTimeStr } from './utils/timeUtils';
import LapList from './LapList';

export default function StopWatch() {
  
  // state to update the timer on screen
  const [time, setTime] = useState(0);

  // state to track if the timer should be running
  const [isRunning, setIsRunning] = useState(false)

  // state to track lap times
  const [laptimes, setLaptimes] = useState<number[]>([])

  // Using useEffect because we are monitoring the setInterval function to get state updates every second.
  useEffect(() => {
      let intervalId: number;

      if (isRunning) {
          // using setInterval so that this state update happends once every second.
          intervalId = setInterval(() => {
              setTime(time => time + 1);
          }, 1000);
      }
      return () => clearInterval(intervalId);

  }, [isRunning, time]);

  // Convert 'time' state (number) to a formatted time string (HH:MM:SS)
  const timeStr = formatTimeStr(time);
  
  function handleAddLap(time: number) {
    const newLaptime = time - laptimes.reduce((partialSum, a) => partialSum + a, 0);
    setLaptimes([newLaptime, ...laptimes]);
  }

  function handleReset(){
    setTime(0);
    setLaptimes([]);
    setIsRunning(false);
  }

  return (
    <SafeAreaView >
      <View style={styles.timeContainer}>
        <Text>{timeStr}</Text>
      </View>
      <View style={styles.buttonGroup}>
        <StopWatchButton varient='Start' onPress={() => {setIsRunning(true)}}/>
        <StopWatchButton varient='Stop' onPress={() => {setIsRunning(false)}}/>
        <StopWatchButton varient='Lap' onPress={() => {handleAddLap(time)}}/>
        <StopWatchButton varient='Reset' onPress={() => {handleReset()}}/>
      </View>
      <View style={styles.lapListContainer}>
        <LapList laptimes={laptimes}/>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0,
    flexDirection: 'column',
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  
  timeContainer: {
    width: '100%',
    height: 200,
    marginLeft: 50,
  },
  
  lapListContainer: {
    flex: 1,
    marginLeft: 50,
    
  },


});