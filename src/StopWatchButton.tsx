<<<<<<< HEAD
import { View } from 'react-native';

export default function StopWatchButton() {
  return (
    <View >
    </View>
  );
}
=======
import React from 'react';
import { SafeAreaView, Pressable, StyleSheet, View, Text, Button } from 'react-native';

export default function StopWatchButton({ name, onClick, color, isDisabled=false }: {
    name: string;
    onClick: () => void;
    color: string;
    isDisabled: boolean;
  }) {

  return (
    <SafeAreaView>
      <Pressable
        style={[styles.buttonShape, {backgroundColor: color}]}  // Customizable color for different scenarios
        onPress={onClick}
        accessibilityLabel={name}
        disabled={isDisabled}>
          <Text style={styles.text}>{name}</Text>
      </Pressable>
    </SafeAreaView>    
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignContent: 'center',
    color: 'black'
  },
  buttonShape: {
    width: 75,
    height: 25,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    marginHorizontal: 10,
    marginTop: 10
  },
  text: {
    color: "white",
    fontWeight: "bold"
  }
});
>>>>>>> bfc9246 (Finally Done!)
