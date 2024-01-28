import { View, Button } from 'react-native';

interface StopWatchButtonProps {
  btnTitle: string;
  onPressButton: () => void;
  disabled?: boolean;
}

export default function StopWatchButton({ btnTitle, onPressButton, disabled }:StopWatchButtonProps) {
  return (
    <View>
      <Button title={btnTitle} onPress={onPressButton} disabled={disabled}/>
    </View>
  );
}