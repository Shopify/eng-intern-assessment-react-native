import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const LapsList = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>1</Text>
        <Text>2</Text>
        <Text>3</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "50%",
  },
});

export default LapsList;
