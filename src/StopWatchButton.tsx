import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  startStopwatch: () => void;
  pauseStopwatch: () => void;
  resetStopwatch: () => void;
  lapStopwatch: () => void;
}

export default function StopWatchButton({startStopwatch, pauseStopwatch, resetStopwatch, lapStopwatch}: Props) {
  return (
    <View >
      <TouchableOpacity onPress={startStopwatch}>
        <Text >Start</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pauseStopwatch}>
        <Text >Pause</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={resetStopwatch}>
        <Text >Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={lapStopwatch}>
        <Text >Lap</Text>
      </TouchableOpacity>
    </View>
  );
}