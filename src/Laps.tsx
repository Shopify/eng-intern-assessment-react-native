import { View, Text } from "react-native";
import { formatTimestamp } from "./utils";

const LapList = ({ laps }: { laps: number[][] }) => {

    const renderLap = (time: number[], index: number) => {
        return <Text key={`lap-${index}`}>{formatTimestamp(time)}</Text>
    }

    return (
        <View testID="lap-list">
            {laps.map(renderLap)}
        </View>
    )
}

export default LapList;