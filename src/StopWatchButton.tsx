import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

// Define the props interface for the StopWatch component.
interface StopWatchButtonProps {
  onToggle: () => void;
  onReset: () => void;
  onLap: () => void;
  laps: string[];
  isActive: boolean;
}

export default function StopWatchButton({
  onToggle,
  onReset,
  onLap,
  laps,
  isActive
}: StopWatchButtonProps) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onToggle}>
          <Text style={styles.buttonText}>{isActive ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={isActive ? onLap : onReset}>
          <Text style={styles.buttonText}>{isActive ? "Lap" : "Reset"}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.lapContainerContent} style={styles.lapContainer}>
        {laps.map((lapTime, index) => ( // Maps laps onto View element.
          <View key={index} style={styles.lap}>
            <Text style={styles.lapText}>{"Lap " + (laps.length - index)}</Text>
            <Text style={styles.lapText}>{lapTime}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "black",
  },
  buttonContainer: {
    height: "25%",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    flexDirection: "row",
    backgroundColor: "black",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(64, 64, 64, 0.7)",
  },
  button: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
  },
  buttonText: {
    fontSize: 25,
    color: "black",
  },
  lapContainer: {
    width: "100%"
  },
  lapContainerContent: {
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center'
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
    width: "90%"
  },
  lapText: {
    color: 'white',
    fontSize: 25,
  },
});
