import { Button, View } from 'react-native';

export default function StopWatchButton( {title, onPress}: {title: string; onPress: () => void} ) {
  return (
    <View >
      <Button title={title} onPress={onPress}/>
    </View>
  );
}