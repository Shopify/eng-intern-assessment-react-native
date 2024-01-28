import { Button, StyleSheet, View } from 'react-native';

type StopWatchButtonProps = {
  isRunning: boolean
  onStartStop: () => void
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({isRunning, onStartStop}) => {
  return (
    <View style={styles.container}>
      <Button title='Lap'/>
      <Button title='Reset'/>
      {isRunning? <Button title='Stop' color='red' onPress={onStartStop}/> : <Button title='Start' color='green' onPress={onStartStop}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
})

export default StopWatchButton