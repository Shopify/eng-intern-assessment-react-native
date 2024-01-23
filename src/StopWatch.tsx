import { useState, useEffect } from 'react';
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
    <Box backgroundColor='mainBackground'>
      <Box alignItems='center' padding='xl'>
        <Text variant='header'>{timeStr}</Text>
      </Box>
      <Box flexDirection='row' justifyContent='center' gap='xl' margin='l'>
        {isRunning ? <StopWatchButton label='Stop' variant='stop' onPress={() => {setIsRunning(false)}}/>
          : <StopWatchButton label='Start' variant='start' onPress={() => {setIsRunning(true)}}/>
        }
        {isRunning ? <StopWatchButton label='Lap' variant='lap' onPress={() => {handleAddLap(time)}}/>
          : <StopWatchButton label='Reset' variant='reset' onPress={() => {handleReset()}}/>
        }
      </Box>
      <Box width='100%' height='60%'>
        {(laptimes.length > 0) ? <LapList laptimes={laptimes}/>
          : <></>}
      </Box>
    </Box>
  );
}
