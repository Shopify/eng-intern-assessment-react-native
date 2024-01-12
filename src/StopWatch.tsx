import { Text, View } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { useEffect, useState } from 'react';
import displayTime from './utils/DisplayTime';

export default function StopWatch() {

  const [isOn, setIsOn] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timeInterval: number | undefined;

    if (isOn) {
      timeInterval = setInterval(() => {
        setTime((lastTime) => lastTime + 0.1);
      }, 100);
    }
    else if (timeInterval) {
      clearInterval(timeInterval);
    }
    return () => {
      if (timeInterval) {
        clearInterval(timeInterval)
      }
    };
  }, [isOn]);

  const startStop = () => {
    setIsOn(!isOn);
  };

  const reset = () => {
    setIsOn(false);
    setTime(0);
  }

  return (
    <View >
      <Text>{displayTime(time)}</Text>
      <StopWatchButton title={isOn ? 'Stop' : 'Start'} onPress={startStop}/>
      <StopWatchButton title='Reset' onPress={reset}/>
    </View>
  );
}