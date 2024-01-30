import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";


// props for control function
interface StopWatchProps {
  isRunning?: boolean;
  handleLeftButtonPress?: () => void;
  handleRightButtonPress?: () => void;
}


// styles
const styles = StyleSheet.create({
  stopWatchButtonBorder: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 70,
  },
  stopWatchButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 65,
    height: 65,
    borderRadius: 65,
  },
});

 // control view for stop watch
//color of button changes depending on if it's on a current lap or it has been reset
const Control: React.FC<StopWatchProps> = ({
  isRunning,
  handleLeftButtonPress,
  handleRightButtonPress,
}) => {
  return (
    <>
      <TouchableOpacity
        style={[
          styles.stopWatchButtonBorder,
          {
            backgroundColor: isRunning ? "#333333" : "#1c1c1e", 
          },
        ]}
        onPress={handleLeftButtonPress}
      >
        <View style={[styles.stopWatchButton]}>
          <Text style={{ color: isRunning ? "#fff" : "#9d9ca2" }}>
            {isRunning ? "Lap " : "Reset"}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.stopWatchButtonBorder,
          {
            backgroundColor: isRunning ? "#340e0d" : "#0a2a12",
          },
        ]}
        onPress={handleRightButtonPress}
      >
        <View style={[styles.stopWatchButton]}>
          <Text style={{ color: isRunning ? "#ea4c49" : "#37d05c" }}>
            {isRunning ? "Stop " : "Start"}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default React.memo(Control); // react memo is used to cache the last rendered result so the values are reused in a new render 
