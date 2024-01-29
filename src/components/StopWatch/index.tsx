import { useState, useRef } from 'react';
import { Text, View, FlatList } from 'react-native';
import StopWatchButton from '../StopWatchButton';
import { formatTime } from '../../utils/helperFunctions';
import { styles } from './styles';

type Lap = {
  lapNumber: number;
  duration: number;
};

export default function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] =  useState<boolean>(false);
  const [isPaused, setIsPaused] =  useState<boolean>(false);
  const [isStopped, setIsStopped] =  useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  // Using refs to maintain values between renders without causing 
  // re-renders when they change
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

  // Transform the laps array into the proper data for the flat list
  const lapData = laps.map((duration, index) => ({
    lapNumber: index + 1,
    duration: duration,
  }));

  const renderLapItem = ({ item }: { item: Lap }) => (
    <View testID='lap-item' style={styles.lapItem}>
      <Text style={styles.column}>{item.lapNumber}</Text>
      <Text style={styles.column}>{formatTime(item.duration)}</Text>
    </View>
  );

  const renderListHeader = () => (
    <View style={styles.header}>
      <Text style={styles.column}>Lap #</Text>
      <Text style={styles.column}>Duration</Text>
    </View>
  );

  const stopWatchJustifyContent = laps.length > 0 ? 'flex-start' : 'center';

  return (
    <View style={{flex: 1, justifyContent: stopWatchJustifyContent }}>
      <View>
        <Text style={styles.displayText}>{formatTime(elapsedTime)}</Text>
      </View>
      <View style={styles.btnStart}>
        <StopWatchButton 
          buttonTitle={isRunning ? (isPaused ? 'Resume' : 'Pause') : 'Start'}
          onPressButton={isRunning ? (isPaused ? handlePressResume : handlePressPause) : handlePressStart}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <StopWatchButton buttonTitle='Reset' onPressButton={handlePressReset} disabled={!isRunning && !isStopped}/>
        <StopWatchButton buttonTitle='Lap' onPressButton={handlePressLap} disabled={!isRunning}/>
        <StopWatchButton buttonTitle='Stop' onPressButton={handlePressStop} disabled={!isRunning}/>
      </View>
      {laps.length > 0 && 
        <FlatList
          data={lapData}
          keyExtractor={item => item.lapNumber.toString()}
          renderItem={renderLapItem}
          style={styles.flatList}
          ListHeaderComponent={renderListHeader}
          testID='lap-list'
        />
      }
    </View>
  );
}