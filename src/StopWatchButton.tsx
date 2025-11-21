import { StyleSheet, TouchableOpacity, Text } from 'react-native';

interface StopWatchButtonProps {
  buttonTappedHandler: () => void;
  label: string;
}

// the stopwatch button is customizable in two ways: the label, and the function invoked when pressed
export default function StopWatchButton({ buttonTappedHandler, label }: StopWatchButtonProps) {

  function handlePress() {
    buttonTappedHandler();
  }

  return (
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#111827',
    borderRadius: 12,
    paddingVertical: 10,
    width: 70,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#a8a8a8',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonLabel: {
    color: '#ffff', 
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

