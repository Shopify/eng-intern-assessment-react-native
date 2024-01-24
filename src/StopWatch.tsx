import { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function StopWatch() {

  const stopwatchInterval = useRef<number>(0) // to keep track of the interval
  const startTime = useRef<number>(0); // to keep track of the start time  

  const [elapsedPausedTime, setElapsedPausedTime] = useState<number>(0); // to keep track of the elapsed time while stopped
  const [isCounting, setIsCounting] = useState<boolean>(false)
  const [displayTime, setDisplayTime] = useState("00:00:00")

  const startInterval = () => {
    startTime.current = new Date().getTime() - elapsedPausedTime;

    function updateStopwatch() {
      setDisplayTime(getDisplayTime())
      !isCounting && setIsCounting(true);
    }
    stopwatchInterval.current = setInterval(updateStopwatch, 1000);
  }

  useEffect(() => {    
    return () => {
      clearInterval(stopwatchInterval.current as number);
    }
  }, [])

  const getDisplayTime = () => {
    const currentTime = new Date().getTime(); // get current time in milliseconds
    const elapsedTime = currentTime - startTime.current; // calculate elapsed time in milliseconds
    const seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
    const minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
    const hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours
    const displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds); // format display time
    return displayTime;
  }

  const pad = (num: number) => {
    // add a leading zero if the number is less than 10
    return (num < 10 ? "0" : "") + num
  }

  
  const start = () => {
    startInterval()
    console.log('Started')
  }
  const stop = () => {
    clearInterval(stopwatchInterval.current)
    setElapsedPausedTime(new Date().getTime() - startTime.current)
    setIsCounting(false)
    console.log('Stopped')
  }
  const reset = () => { 
    clearInterval(stopwatchInterval.current)
    setElapsedPausedTime(0)
    setIsCounting(false)
    setDisplayTime("00:00:00")
    console.log('Reset')
  }

  const startOrStop = () => {
    if (isCounting) {
      stop()
    } else {
      start()
    }
  }

  return (
    <View>
      <Text>{displayTime}</Text>
      <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', columnGap: 40, marginTop: 30 }}>
        <Pressable onPress={startOrStop}>
          <Text>{!isCounting ? 'Start' : 'Stop'}</Text>
        </Pressable>
        <Pressable onPress={reset}>
          <Text>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}