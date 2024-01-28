import { Button, StyleSheet, View } from 'react-native';

type StopWatchButtonProps = {
  isRunning: boolean
  onStartPress: () => void
  onStopPress: () => void
  onResetPress: () => void
  onLapPress: () => void
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({isRunning, onStartPress, onStopPress, onResetPress, onLapPress}) => {
  return (
    <View style={styles.container}>
      {
        isRunning ? ( 
          <>
            <Button title='Lap' onPress={onLapPress}/>
            <Button title='Stop' color='red' onPress={onStopPress}/>
          </>
        ) : (
          <>
            <Button title='Reset' onPress={onResetPress}/>
            <Button title='Start' color='green' onPress={onStartPress}/>
          </>
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