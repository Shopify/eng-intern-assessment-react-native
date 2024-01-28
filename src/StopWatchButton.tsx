import { Button, StyleSheet, View } from 'react-native';

type StopWatchButtonProps = {
  isRunning: boolean
  onStartPress: () => void
  onStopPress: () => void
  onResetPress: () => void
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({isRunning, onStartPress, onStopPress, onResetPress}) => {
  return (
    <View style={styles.container}>
      <Button title='Lap'/>
      <Button title='Reset' onPress={onResetPress}/>
      {
        isRunning ? ( 
          <Button title='Stop' color='red' onPress={onStopPress}/>
        ) : (
          <Button title='Start' color='green' onPress={onStartPress}/>
        )
      }
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