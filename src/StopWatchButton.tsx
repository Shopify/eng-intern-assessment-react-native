import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { StopWatchButtonProps } from './types';

export default function StopWatchButton(props: StopWatchButtonProps) {
  const {
    onPress = () => {},
    text
  } = props;

  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={onPress}
    >
      <Text> {text} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: "#FFCCCB",
    marginHorizontal: 10,
  },
});
