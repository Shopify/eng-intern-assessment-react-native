import { View } from 'react-native';
import { Button } from 'react-native';

interface StopWatchButtonProps {
  buttonTappedHandler: () => void;
  label: string;
}

export default function StopWatchButton({ buttonTappedHandler, label }: StopWatchButtonProps) {
  
  const handlePress = () => {
    buttonTappedHandler()
  }

  return (
    <View >
      <Button title={label} onPress={handlePress}/>
    </View>
  );
}