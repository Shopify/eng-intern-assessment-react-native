import { Text } from "react-native";
import { formatTimestamp } from "./utils";

const Timestamp = ({ time }: { time: number[] }) => {
    return (
        <Text>{formatTimestamp(time)}</Text>
    )
}

export default Timestamp;