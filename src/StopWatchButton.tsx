import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  border: {
    borderRadius: 70,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    justifyContent: "center",
    height: 65,
    borderRadius: 65,
    alignItems: "center",
    width: 65,
  },
});

interface StopWatchProps {
  isRunning?: boolean;
  handleLeftButtonPress?: () => void;
  handleRightButtonPress?: () => void;
}

const Control: React.FC<StopWatchProps> = ({
  isRunning,
  handleLeftButtonPress,
  handleRightButtonPress,
}) => {
  return (
    <>
      <TouchableOpacity
        style={[
          styles.border,
          {
            backgroundColor: isRunning ? "#333333" : "#1c1c1e",
          },
        ]}
        onPress={handleLeftButtonPress}
      >
        <View style={[styles.button]}>
          <Text style={{ color: isRunning ? "#fff" : "#9d9ca2" }}>
            {isRunning ? "Lap " : "Reset"}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.border,
          {
            backgroundColor: isRunning ? "#340e0d" : "#0a2a12",
          },
        ]}
        onPress={handleRightButtonPress}
      >
        <View style={[styles.button]}>
          <Text style={{ color: isRunning ? "#ea4c49" : "#37d05c" }}>
            {isRunning ? "Stop " : "Start"}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default React.memo(Control); // react memo is used to cache the last rendered result so the values are reused in a new render
