import { StyleSheet, Text, View } from 'react-native';
import { convertMillisToClockTimeString } from '../util/TimeConverter';

export default function StopWatchLap(props: Readonly<StopWatchLapProps>) {
    return (
        <View style={styles.stopWatchLapContainer}>
            <Text>{`Lap ${props.allLaps.length + 1}`}</Text>
            <Text>{convertMillisToClockTimeString(props.latestLap)}</Text>
            {
                props.allLaps.map((lap, i) => (
                    <>
                        <Text>{`Lap ${props.allLaps.length - i}`}</Text>
                        <Text>{convertMillisToClockTimeString(lap)}</Text>
                    </>
                )
                )
            }
        </View>
    )
}

type StopWatchLapProps = {
    latestLap: number;
    allLaps: number[];
};

const styles = StyleSheet.create({
    stopWatchLapContainer: {
      flex: 2
    }
  });
  