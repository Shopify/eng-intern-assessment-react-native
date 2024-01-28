import {Text, View} from 'react-native';
import Interval from "./Interval";

type StopWatchProps = {
    elapsedTime: Interval;
};

export default function StopWatch(props: Readonly<StopWatchProps>) {
    const {hours, minutes, seconds} = props.elapsedTime;

    const pad = (n: number) => {
        return n < 10 ? `0${n}` : `${n}`;
    }
    return (
        <View>
            <Text>{pad(hours)}:{pad(minutes)}:{pad(seconds)}</Text>
        </View>
    );
}