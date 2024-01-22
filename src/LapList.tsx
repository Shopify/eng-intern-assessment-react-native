import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { LapListProps } from './types';

export default function LapList(props: LapListProps) {
  const {
    lapList = [],
  } = props;

  const lapsText = lapList.map(
    (lap, i) => <Text key={i} style={styles.text}> Lap {lapList.length - i}:       {lap} </Text>
  )

  return (
    <View 
      style={styles.scrollable}
      data-testid="lap-list"
    >
      <ScrollView 
        contentContainerStyle={styles.container}
      >
        {lapsText}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollable: {
    marginVertical: 20,
    height: 300,
    width: 400,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: "#5A5A5A",
    marginVertical: 10,
  }
});
