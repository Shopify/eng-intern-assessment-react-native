import { Text, View } from "react-native";

export default function StopWatch(props: Readonly<StopWatchProps>) {
    const formatTime = (time: number) => {
        return String(time).padStart(2, "0");
    };

    return (
        <View>
            <Text>{`${formatTime(props.minutes)}:${formatTime(props.seconds)}:${formatTime(props.milliseconds/10)}`}</Text>
        </View>
    );
};

type StopWatchProps = {
    minutes: number;
    seconds: number;
    milliseconds: number;
};
