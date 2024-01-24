import { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { LapContainer } from './LapContainer';

type Status = 'initial' | 'started' | 'paused' | 'stopped' | 'reset'

export default function StopWatch() {

  const stopwatchInterval = useRef<number>(0) // to keep track of the interval
  const startTime = useRef<number>(0); // to keep track of the start time  

  const [elapsedPausedTime, setElapsedPausedTime] = useState<number>(0); // to keep track of the elapsed time while stopped
  const [displayTime, setDisplayTime] = useState("00:00:00")
  const [status, setStatus] = useState<Status>('initial')
  const [laps, setLaps] = useState<Array<string>>([])

  const startInterval = () => {
    startTime.current = new Date().getTime() - elapsedPausedTime;

    function updateStopwatch() {
      setDisplayTime(getDisplayTime())
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

  
  const isNotCounting = () => {
    return status === 'stopped' || status === 'reset' || status === 'initial'
  }

  const start = () => {
    startInterval()
    setStatus('started');
    console.log('Started')
  }
  const stop = () => {
    clearInterval(stopwatchInterval.current)
    setElapsedPausedTime(0)
    setLaps([]);
    setStatus('stopped')
    console.log('Stopped') 
  }
  const pause = () => {
    clearInterval(stopwatchInterval.current)
    setElapsedPausedTime(new Date().getTime() - startTime.current)
    setStatus('paused')
    console.log('Paused')
  }
  const reset = () => { 
    clearInterval(stopwatchInterval.current)
    setElapsedPausedTime(0)
    setDisplayTime("00:00:00")
    setStatus('reset')
    console.log('Reset')
  }

  const lap = () => {
    setLaps((prevLaps) => [...prevLaps, displayTime])
  }

  return (
    <View>
      <Text>{status != 'stopped' && displayTime}</Text>
      <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', columnGap: 20, marginTop: 30 }}>
        <Pressable onPress={start}>
          <Text>Start</Text>
        </Pressable>
        <Pressable onPress={stop}>
          <Text>Stop</Text>
        </Pressable>
        <Pressable onPress={reset}>
          <Text>Reset</Text>
        </Pressable>
        <Pressable onPress={pause}>
          <Text>Pause</Text>
        </Pressable>
        <Pressable onPress={start}>
          <Text>Resume</Text>
        </Pressable>
        <Pressable onPress={lap}>
          <Text>Lap</Text>
        </Pressable>
      </View>

      <LapContainer laps={laps} />
    </View>
  );
}