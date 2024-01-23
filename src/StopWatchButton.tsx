import { Pressable, Text } from 'react-native';

export default function StopWatchButton(
  { text, onPress, disabled }:
    {
      disabled?: boolean,
      onPress: () => void
      text: string;
    }) {
  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <Text>{text}</Text>
    </Pressable>
  );
}