import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StopWatchButtonsProps {
  name: string;
  onPress: () => void;
}

const StopWatchButtons: React.FC<StopWatchButtonsProps> = ({ name, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
  },
});

export default StopWatchButtons;



// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

// interface StopWatchButtonsProps {
//   isRunning: boolean;
//   onStartStop: () => void;
//   onReset: () => void;
//   onLap: () => void;
// }


// const StopWatchButtons: React.FC<StopWatchButtonsProps> = ({ isRunning, onStartStop, onReset, onLap }) => {
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={onReset}>
//         <Text>Reset</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={[styles.button, styles.buttonStart]} onPress={onStartStop}>
//         <Text>{isRunning ? 'Pause' : 'Start'}</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={onLap}>
//         <Text>Lap</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   button: {
//     padding: 10,
//     backgroundColor: '#3498db',
//     borderRadius: 5,
//     margin: 5,
//     alignItems: 'center',
//   },
//   buttonStart: {
//     backgroundColor: '#2ecc71',
//     width: 100,
//   }
// });

// export default StopWatchButtons;
