// StopWatchButton.tsx;
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StopWatchButtonProps {
  label: string;
  onPress: () => void;
}

//Simple view, with functionality handled in the StopWatch.tsx file
function StopWatchButton({ label, onPress }: StopWatchButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'deepskyblue',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default StopWatchButton;
