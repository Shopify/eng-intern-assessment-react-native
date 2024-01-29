import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    timeContainer:{
      margin: 24,
    },
    stopwatchText: {
        display: "flex",
        justifyContent: "center",
        fontSize: 60,
        color: '#fff'
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%"
    },
    button: {
      backgroundColor: '#708090',
      padding: 10,
      borderRadius: 5,
      justifyContent:"center",
      alignItems: 'center'
    },
    buttonText: {
      fontSize: 20,
      color: '#fff'
    },
    scrollContainer: {
      maxHeight: 200,
      overflow: 'scroll',
    },
    lapText:{
      color: '#fff'
    }
  });
  