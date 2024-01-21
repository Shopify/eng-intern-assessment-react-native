import { 
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { 
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';
import { Theme } from './theme';
import Box from './Box';


type StopWatchButtonProps = {
  varient: 'start' | 'stop' | 'lap' | 'reset';
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

