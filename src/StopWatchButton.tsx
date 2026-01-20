import { Pressable, StyleSheet, Text } from "react-native";

/**
 * Types that are supported for the StopWatchButtonComponent
 */
export enum ButtonTypes {
    STOP = "Stop",
    START = "Start",
    RESUME = "Resume",
    LAP = "Lap",
    RESET = "Reset",
}

interface StopWatchButtonProps {
    type: ButtonTypes;
    onPress: () => void;
}

/**
 * Component that renders a button for the stopwatch
 */
export default function StopWatchButton({
    type,
    onPress,
}: StopWatchButtonProps) {
    const containerStyle = { ...buttonStyles[type], ...styles.container };
    const textStyle = { ...textStyles[type], ...styles.text };

    return (
        <Pressable
            style={{ ...containerStyle, ...styles.container }}
            onPress={() => {
                onPress();
            }}
        >
            <Text style={textStyle}>{type}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 50,
        borderRadius: 100,
        height: 100,
        width: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    text: { fontSize: 20, fontWeight: "bold" },
});

const buttonStyles = StyleSheet.create({
    Start: { backgroundColor: "green" },
    Stop: { backgroundColor: "lightcoral" },
    Resume: { backgroundColor: "lightgreen" },
    Lap: { backgroundColor: "gray" },
    Reset: { backgroundColor: "red" },
});

const textStyles = StyleSheet.create({
    Start: { color: "white" },
    Stop: { color: "white" },
    Resume: { color: "black" },
    Lap: { color: "white" },
    Reset: { color: "white" },
});
