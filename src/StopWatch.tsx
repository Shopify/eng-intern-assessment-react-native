import { View } from 'react-native';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  return (
    <View>
      <StopWatchButton action='start' onPress={() => console.log("Nice")}></StopWatchButton>
      <StopWatchButton action='stop' onPress={() => console.log("Nice")}></StopWatchButton>
      <StopWatchButton action='lap' onPress={() => console.log("Nice")}></StopWatchButton>
      <StopWatchButton action='reset' onPress={() => console.log("Nice")}></StopWatchButton>
    </View>
  );
}