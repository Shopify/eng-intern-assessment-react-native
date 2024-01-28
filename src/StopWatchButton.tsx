import { View, Button, Text } from "react-native";
import React, { useState } from "react";

export default function StopWatchButton() {
  var [pressedStart, setPressedStart] = useState(false);

  return (
    <View>
      <Text>
        <Button
          title="Lap"
          disabled={(pressedStart = false)}
          onPress={() => setPressedStart(true)}
        ></Button>

        <Button title="Start"></Button>
      </Text>
    </View>
  );
}
