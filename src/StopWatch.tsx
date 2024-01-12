import { Text, View } from 'react-native';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  return (
    <View >
      <Text>00:00:00</Text>
      <StopWatchButton title='Start'/>
    </View>
  );
}