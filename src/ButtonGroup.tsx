import StopWatchButton from "./StopWatchButton";
import { View, StyleSheet } from "react-native"


const ButtonGroup = ({
    isRecording, onPressStart, onPressStop, onPressReset, onPressLap
}: {
    isRecording: boolean,
    onPressStart: () => void,
    onPressStop: () => void,
    onPressReset: () => void,
    onPressLap: () => void,
}) => {

    return (
        <View>
            <StopWatchButton
                onPress={isRecording ? onPressStop : onPressStart}
                text={isRecording ? "Stop" : "Start"}
            />
            <StopWatchButton
                onPress={onPressReset}
                text="Reset"
            />
            <StopWatchButton
                onPress={onPressLap}
                text="Lap"
            />
        </View>
    )
}

export default ButtonGroup;