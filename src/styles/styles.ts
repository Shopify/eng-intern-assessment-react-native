
import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'flex-start', 
      paddingTop: 200, 
    },
    displayContainer: {
      width: 300, 
      height: 100,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#fff',
    },
    timerText: {
      fontSize: 90,
      color: '#fff',
      fontFamily: 'Roboto',
      letterSpacing: 2,
      textAlign: 'center',
      marginBottom: 40, 
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 20, 
      width: '100%', 
    },
    startButton: {
      backgroundColor: '#4CAF50',
      padding: 15,
      width: 75,
      height: 75,
      borderRadius: 37.5, 
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.8,
      shadowColor: '#000', 
      shadowOffset: {
        width: 0,
        height: 4, 
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65, 
    },
    stopButton: {
      backgroundColor: '#9A1A1A',
      padding: 15,
      width: 75,
      height: 75,
      borderRadius: 37.5, 
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.7
    },
    buttonTextStart: {
      fontSize: 20,
      color: '#ff0000',
      opacity: 1,
    },
    buttonTextStop: {
      fontSize: 20,
      color: '#00E100',
      opacity: 1,
    },
  });
  
  