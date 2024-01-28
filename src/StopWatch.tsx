import { useState, useRef } from 'react';
import { Text, View } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { formatTime } from './utils/helperFunctions';

export default function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const handlePressStart = () => {
    if (!isRunning) {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
      setIsRunning(true);
    }
  };

  const handlePressStop = () => {
    clearInterval(intervalRef.current!);
    setIsRunning(false);
  };

  const handlePressReset = () => {
    console.log("Reset");
  };

  const handlePressLap = () => {
    console.log("Lap");
  };

  return (
    <>
      <View>
        <Text>{formatTime(elapsedTime)}</Text>
      </View>
      <View>
        <StopWatchButton btnTitle='Start' onPressButton={handlePressStart}/>
        <StopWatchButton btnTitle='Stop' onPressButton={handlePressStop}/>
        <StopWatchButton btnTitle='Reset' onPressButton={handlePressReset}/>
        <StopWatchButton btnTitle='Lap' onPressButton={handlePressLap}/>
      </View>
    </>
  );
}