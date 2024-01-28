import { useState, useRef } from 'react';
import { Text, View } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { formatTime } from './utils/helperFunctions';

export default function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
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
    clearInterval(intervalRef.current!);
    setElapsedTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  const handlePressLap = () => {
    if(elapsedTime === 0) return;
    setLaps([...laps, elapsedTime]);
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
      {laps.length > 0 && laps.map((lapTime, index) => (
        <View testID='lap-list'>
          <Text key={index}>{`Lap ${index + 1}: ${formatTime(lapTime)}`}</Text>
        </View>
      ))}
    </>
  );
}