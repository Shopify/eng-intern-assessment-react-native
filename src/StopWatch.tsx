// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';

// export default function Stopwatch() {
//   const [time, setTime] = useState(0);
//   const [laps, setLaps] = useState([]);
//   const [isRunning, setIsRunning] = useState(false);

//   useEffect(() => {
//     // Use ReturnType to infer the type returned by setInterval
//     let interval: ReturnType<typeof setInterval>;
//     if (isRunning) {
//       interval = setInterval(() => {
//         setTime(prevTime => prevTime + 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval as unknown as number);
//   }, [isRunning]);



//   return (
//     <View>
//       {/* Display time and laps */}
//       <Text>{time}</Text>
//       {/* Display laps */}
//       {/* Display buttons */}
//     </View>
//   );
// }
// src/Stopwatch.tsx
import React from 'react';
import { View, Text } from 'react-native';

// Define a type for the props
type StopwatchProps = {
  time: number;
  laps: number[];
};

const Stopwatch: React.FC<StopwatchProps> = ({ time, laps }) => {
  // Function to format time in seconds to MM:SS format
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const miliseconds = 
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
  };

  return (
    <View>
      <Text>{formatTime(time)}</Text>
      {laps.map((lap: number, index: number) => (
        <Text key={index}>Lap {index + 1}: {formatTime(lap)}</Text> 
      ))}
    </View>
  );
};

export default Stopwatch;

