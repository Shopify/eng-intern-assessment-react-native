import { Pressable, Text } from 'react-native';

export default function StopWatchButton(
  { text, onPress }:
    {
      text: string;
      onPress: () => void
    }) {
  return (
    <Pressable onPress={onPress}>
      <Text>{text}</Text>
    </Pressable>
  );
}