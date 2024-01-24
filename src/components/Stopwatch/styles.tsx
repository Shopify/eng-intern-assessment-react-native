import { StyleSheet } from "react-native";

export default StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
    },
    lapListContainer: {
      position: 'absolute',
      top: 60,
      width: '100%',
      height: '65%',
    },
    lapTextContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginBottom: 5,
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#c2c2c2',
    },
    lapLabel: {
      color: '#FFF',
      fontSize: 18,
    },
    lapTime: {
      color: '#FFF',
      fontSize: 18,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 30,
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    timeText: {
      fontSize: 76,
      color: '#FFF',
      // fontFamily: 'Roboto',
      textAlign: 'center',
      width: 300,
    },
    timeContainer: {
      position: 'absolute',
      top: '73%',
      alignItems: 'center',
      width: '100%',
      height: 100,
    },
    separator: {
      height: 1,
      backgroundColor: '#FFF',
      width: '100%',
      marginBottom: 15,
    },
  });