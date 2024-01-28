import { Text, View } from 'react-native';

interface Props {
  time: string
}

export default function StopWatch({time}: Props) {
  return (
    <View >
      <Text>
        {time}
      </Text>
    </View>
  );
}