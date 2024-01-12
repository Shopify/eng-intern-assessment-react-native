import { Text, View } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { useEffect, useState } from 'react';

export default function StopWatch() {

  const [isOn, setIsOn] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timeInterval: number | undefined;

    if (isOn) {
      timeInterval = setInterval(() => {
        setTime((lastTime) => lastTime + 10);
      }, 10);
    }
    return () => {
      if (timeInterval) {
        clearInterval(timeInterval)
      }
    };
  });

  const startStop = () => {
    setIsOn(!isOn);
  };

  const displayTime = (ms: number) => {
    const milliseconds = ms;
    return `${milliseconds}`;
  };

  return (
    <View >
      <Text>{displayTime(time)}</Text>
      <StopWatchButton title={isOn ? 'Stop' : 'Start'} onPress={startStop}/>
    </View>
  );
}