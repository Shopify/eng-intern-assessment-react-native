import { View, Button } from 'react-native';

interface StopWatchButtonProps {
  btnTitle: string;
  onPressButton: () => void;
}

export default function StopWatchButton({ btnTitle, onPressButton }:StopWatchButtonProps) {
  return (
    <View>
      <Button title={btnTitle} onPress={onPressButton}/>
    </View>
  );
}