import { useState, useEffect } from 'react';
import { SafeAreaView, 
        StyleSheet,
        View,
       } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { formatTimeStr } from './utils/timeUtils';
import LapList from './LapList';
import Box from './Box';
import Text from './Text';

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
    <Box backgroundColor='mainBackground' flex={0}>
      <Box>
        <Text>{timeStr}</Text>
      </Box>
      <Box>
        <StopWatchButton varient='start' onPress={() => {setIsRunning(true)}}/>
        <StopWatchButton varient='stop' onPress={() => {setIsRunning(false)}}/>
        <StopWatchButton varient='lap' onPress={() => {handleAddLap(time)}}/>
        <StopWatchButton varient='reset' onPress={() => {handleReset()}}/>
      </Box>
      <Box backgroundColor='mainBackground'>
        <LapList laptimes={laptimes}/>

      </Box>
    </Box>
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
    backgroundColor: 'mainBackground',
  },
  
  lapListContainer: {
    flex: 1,
    marginLeft: 50,

  },


});