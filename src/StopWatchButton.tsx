import { Button, View } from 'react-native';
import StopWatchStyles from './StopWatchStyle';
interface IStopProps {
  isRunning: boolean;
  startAndStop: () => void;
  reset: () => void;
  lap: () => void;
}
export default function StopWatchButton(props: IStopProps) {
  const { isRunning, startAndStop, reset, lap } = props;
  return (
    <View style={StopWatchStyles.stopwatchButtons}>
    <Button title={isRunning ? 'Stop' : 'Start'} onPress={startAndStop} />
    <Button title="Reset" onPress={reset} />
    <Button title="Lap" onPress={lap} />
  </View>
  );
}
















