import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import theme from './theme';

type StopWatchButtonProps = {
  varient: 'Start' | 'Stop' | 'Lap' | 'Reset';
  onPress: () => void;
};

export default function StopWatchButton({varient, onPress}: StopWatchButtonProps) {
  
  

  return (
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Text>{varient}</Text>
      </TouchableOpacity>

    
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 106,
    height: 75,
    flex: 0,
    justifyContent: 'center',
    backgroundColor: '#A0A0A0',
    flexDirection: 'row',
  },
  Text: {
    fontSize: 32,

  },

});

