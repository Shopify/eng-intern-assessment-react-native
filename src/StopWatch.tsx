import { StyleSheet, View, Text } from 'react-native';
import { StopWatchProps } from './types';

export default function StopWatch(props: StopWatchProps) {
  const {
    formattedTime = '00:00:00'
  } = props;

  return (
    <View style={styles.display}>
      <Text style={styles.text}> {formattedTime} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    width: 300,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: "#ADD8E6",
    marginVertical: 20,
  },
  text: {
    fontSize: 30,
    color: "#5A5A5A"
  }
});
