import { useState, useRef } from 'react';
import { Text, View } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { formatTime } from './utils/helperFunctions';

export default function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const handlePressStart = () => {
    setIsStopped(false);
    if (!isRunning && !isPaused) {
      startTimeRef.current = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current!);
      }, 100);
      setIsRunning(true);
    }
  };

  const handlePressStop = () => {
      clearInterval(intervalRef.current!);
      setIsRunning(false);
      setIsPaused(false);
      setIsStopped(true);
      setElapsedTime(0);
  };

  const handlePressPause = () => {
    if (isRunning && !isPaused) {
      clearInterval(intervalRef.current!);
      setIsPaused(true);
    }
  };

  const handlePressReset = () => {
    clearInterval(intervalRef.current!);
    setElapsedTime(0);
    setLaps([]);
    setIsRunning(false);
    setIsPaused(false);
    setIsStopped(false);
  };

  const handlePressResume = () => {
    if (isRunning && isPaused) {
      startTimeRef.current = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current!);
      }, 100);
      setIsPaused(false);
    }
  };

  const handlePressLap = () => {
    setLaps((prevLaps) => [...prevLaps, elapsedTime]);
  };

  return (
    <>
      <View>
        <Text>{isStopped ? "Timer stopped" : formatTime(elapsedTime)}</Text>
      </View>
      <View>
        <StopWatchButton 
          btnTitle={isRunning ? (isPaused ? 'Resume' : 'Pause') : 'Start'}
          onPressButton={isRunning ? (isPaused ? handlePressResume : handlePressPause) : handlePressStart}
        />
        <StopWatchButton btnTitle='Stop' onPressButton={handlePressStop} disabled={!isRunning}/>
        <StopWatchButton btnTitle='Reset' onPressButton={handlePressReset} disabled={!isRunning && !isStopped}/>
        <StopWatchButton btnTitle='Lap' onPressButton={handlePressLap} disabled={!isRunning}/>
      </View>
      {laps.length > 0 &&
        <View testID='lap-list'>
          {laps.map((lapTime, index) => (
            <Text key={index}>{`Lap ${index + 1}: ${formatTime(lapTime)}`}</Text>
          ))}
        </View>
      }
    </>
  );
}