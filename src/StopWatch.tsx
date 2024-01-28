import { StyleSheet, Text, View } from 'react-native';

interface Props {
  time: string
}

export default function StopWatch({time}: Props) {
  return (
    <View >
      <Text style={styles.timeText}>
        {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timeText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#000'
  }
});