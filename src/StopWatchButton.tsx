import { DimensionValue, Insets, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ActionTypes =
  | "start"
  | "stop"
  | "reset"
  | "lap";

interface StopWatchButtonProps {
  action: ActionTypes
  onPress(): void;

  height?: DimensionValue;
  width?: DimensionValue;

  buttonColor?: string;
  buttonBorderColor?: string;

  borderRadius?: number;
  bottomBorderWidth?: number;

  isDisabled?: boolean;
  hitslop?: Insets;
}

export default function StopWatchButton(
  {
    action, 
    onPress, 
    height = 40,
    width = 80,
    buttonColor = "#6BBDF3",
    buttonBorderColor = "white",
    borderRadius = 8,
    isDisabled = false,
    hitslop = { top: 20, bottom: 20, left: 20, right: 20 },
    ...props
  }
  : StopWatchButtonProps) {

  //Button title is just the action capitalized
  const buttonTitle = action.substring(0, 1).toUpperCase() + action.substring(1);

  return (
    <View
      style={{
        height: height,
        width: width,
      }}
    >
      <View 
        style={{
          backgroundColor: isDisabled ? "#484254" : buttonColor,
          borderColor: isDisabled ? "#777777" : buttonBorderColor,
          borderRadius: borderRadius,
        }}
        {...props}
      >
        <TouchableOpacity
          hitSlop={hitslop}
          disabled={isDisabled}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={onPress}
        >
          <Text style={styles.text}>{buttonTitle}</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#FAFAFA",
  },
});
