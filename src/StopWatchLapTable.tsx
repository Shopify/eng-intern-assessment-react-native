import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface Props {
  lapList: string[];
}

export default function StopWatchLapTable({ lapList }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {lapList.map((item, index) => (
          <Text key={index} style={styles.item}>
            {item}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: '#fff'
  }
});
