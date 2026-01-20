import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

// Define the props interface for the StopWatch component.
interface StopWatchButtonProps {
  onToggle: () => void;
  onReset: () => void;
  onLap: () => void;
  isActive: boolean;
}

export default function StopWatchButton({
  onToggle,
  onReset,
  onLap,
  isActive,
}: StopWatchButtonProps) {

  return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            isActive ? styles.redButton : styles.greenButton,
          ]}
          onPress={onToggle}
          testID="start-stop"
        >
          <Text
            style={[
              styles.buttonText,
              isActive ? styles.redText : styles.greenText,
            ]}
          >
            {/* Change state between Stop and Start based on Stopwatch activity */}
            {isActive ? "Stop" : "Start"} 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={isActive ? onLap : onReset}
          testID="lap-reset"
        >
          {/* Change state between Lap and Reset based on Stopwatch activity */}
          <Text style={styles.buttonText}>{isActive ? "Lap" : "Reset"}</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  /* Button Styles */
  buttonContainer: {
    height: "25%",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    backgroundColor: "black",
  },
  button: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    backgroundColor: "#1b1b1b",
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  greenButton: {
    backgroundColor: "#0a2a12",
  },
  redButton: {
    backgroundColor: "#330e0c",
  },
  /* Laps Styles */
  lapContainer: {
    width: "100%",
    paddingBottom: 50,
  },
  lapContainerContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  lap: {
    backgroundColor: "black",
    flex: 1,
    marginTop: 8,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(64, 64, 64, 0.7)",
    width: "90%",
  },
  lapText: {
    fontSize: 22,
  },
  /* Text styles */
  greenText: {
    color: "#30d158",
  },
  redText: {
    color: "#ff453a",
  },
  whiteText: {
    color: "white",
  },
});
