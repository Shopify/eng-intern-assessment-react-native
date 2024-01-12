import { Text, View } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { useEffect, useState } from 'react';
import displayTime from './utils/DisplayTime';

export default function StopWatch() {

  const [isOn, setIsOn] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<{[key: number]: number}>({});

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
    setLaps({});
  };

  const lap = () => {
    if(isOn) {
      setLaps((previousLaps) => ({
        ...previousLaps,
        [`lap${Object.keys(previousLaps).length + 1}`]: time,
      }))
    }
  };

  return (
    <View >
      <Text>{displayTime(time)}</Text>
      <StopWatchButton title={isOn ? 'Stop' : 'Start'} onPress={startStop}/>
      <StopWatchButton title='Reset' onPress={reset}/>
      <StopWatchButton title='Lap' onPress={lap} />
      {Object.entries(laps).length > 0 && (
        <View>
          <Text>Lap Times:</Text>
          {Object.entries(laps).map(([lapKey, lapTime]) => (
            <Text key={lapKey}>{`${lapKey}: ${displayTime(lapTime)}`}</Text>
          ))}
        </View>
      )}
    </View>
  );
}