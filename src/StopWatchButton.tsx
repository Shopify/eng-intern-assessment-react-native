import { View } from 'react-native';
import { Button } from '@shopify/polaris'

interface StopWatchButtonProps {
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onRecordLap: () => void;
}

export default function StopWatchButton({
  onStart,
  onStop,
  onReset,
  onRecordLap,
}: StopWatchButtonProps) {
  return (
    <View>
      <Button onClick={onStart}>Start</Button>
      <Button onClick={onStop}>Stop</Button>
      <Button onClick={onReset}>Reset</Button>
      <Button onClick={onRecordLap}>Lap</Button>
    </View>
  );
}