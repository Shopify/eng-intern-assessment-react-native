import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StopWatchButtonProps {
  title: string;
  onPress: () => void;
}

export default function StopWatchButton({ title, onPress }: StopWatchButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#96bf48',
    padding: 10,
    borderRadius: 3,
    marginHorizontal: 45,
    marginBottom: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
