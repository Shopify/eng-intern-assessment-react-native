import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    stopwatchText: {
        display: "flex",
        justifyContent: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "60%"
    },
    button: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      justifyContent:"center",
      alignItems: 'center'
    },
    buttonText: {
      fontSize: 20,
    }
  });
  