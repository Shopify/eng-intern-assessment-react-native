import { Pressable, StyleSheet, Text } from 'react-native';

interface StopWatchButtonProps {
  children: string
  onPressHandler: () => any
}

export default function StopWatchButton({ children, onPressHandler }: StopWatchButtonProps) {
  return (
    <Pressable onPress={onPressHandler}>
      <Text style={styles.button}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    color: '#fff'
  }
})