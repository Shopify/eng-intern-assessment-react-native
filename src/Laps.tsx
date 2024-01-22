import { View, Text } from "react-native";
import { formatTimestamp } from "./utils";

const Laps = ({ laps }: { laps: number[][] }) => {

    const renderLap = (time: number[], index: number) => {
        return <Text key={`lap-${index}`}>Lap {index + 1} {formatTimestamp(time)}</Text>
    }

    return (
        <View>
            {laps.map(renderLap)}
        </View>
    )
}

export default Laps;