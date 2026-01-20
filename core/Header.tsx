import * as React from "react";
import { Appbar } from "react-native-paper";

const titleStyles = {
  color: {
    color: "#fff",
  },
};

const StopwatchHeading = () => {
  return (
    <Appbar.Header style={{ backgroundColor: "purple" }}>
      <Appbar.Content
        testID=""
        title="STOPWATCH"
        titleStyle={titleStyles.color}
      />
    </Appbar.Header>
  );
};

export default StopwatchHeading;
