import { View, Text, StyleSheet } from "react-native";
import { formatTimestamp } from "./utils";

const LapList = ({ laps, visible }: { laps: number[][], visible: boolean }) => {

    const renderLap = (time: number[], index: number) => {
        return <Text style={styles.lap} key={`lap-${index}`}>{formatTimestamp(time)}</Text>
    }

    return (
        <View style={styles.container} >
            {visible &&
                <View testID="lap-list">
                    {laps.map(renderLap)}
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        width: 150,
        marginBottom: 25,
        height: 200 // assuming that only a few laps will be recorded
    },
    lap: { textAlign: "center" }
})

export default LapList;