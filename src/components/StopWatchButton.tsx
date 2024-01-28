import { Button, StyleSheet, View } from 'react-native';
import { theme } from '../data/theme';

/**
 * StopWatchButton
 * @author Vivian Dai
 * Generic button taking in the name of the button (title in React Native) 
 * and function for button to execute
 */
export default function StopWatchButton({name, action}: {name: string, action: () => void}): JSX.Element {
  return (
    <View style={styles.container}>
      <Button title={name} onPress={action} color={theme.button} ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    color: theme.text,
  },
});
