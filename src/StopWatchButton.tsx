import { Button, View } from 'react-native';

export default function StopWatchButton( {title}: {title: string} ) {
  return (
    <View >
      <Button title={title}/>
    </View>
  );
}