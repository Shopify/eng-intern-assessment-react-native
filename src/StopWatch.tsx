import { View } from 'react-native';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const handlePressStart = () => {
    console.log("Start");
  };

  const handlePressStop = () => {
    console.log("Stop");
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
        <StopWatchButton btnTitle='Start' onPressButton={handlePressStart}/>
        <StopWatchButton btnTitle='Stop' onPressButton={handlePressStop}/>
        <StopWatchButton btnTitle='Reset' onPressButton={handlePressReset}/>
        <StopWatchButton btnTitle='Lap' onPressButton={handlePressLap}/>
      </View>
    </>
  );
}