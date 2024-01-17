import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Svg, Circle, G } from 'react-native-svg';


import colors from '../config/colors';


interface ClockProps {
  time: number;
}


// Functional component Clock that takes time as a prop
const Clock: React.FC<ClockProps> = ({ time }) => {
  // State to manage the rotation of the clock hand
  const [rotation, setRotation] = useState(0);
  // Ref to store the start time when the component mounts
  const startTimeRef = useRef<number | null>(null);


  // useEffect hook to handle updates to time and manage rotation
  useEffect(() => {
    // Function to update rotation based on the elapsed time
    const updateRotation = () => {
      if (startTimeRef.current !== null) {
        // Calculate the remaining rotation based on time
        const remainingRotation = (time / 60000) * 360;
        // Update the rotation state
        setRotation(remainingRotation);
      }
      // Request the next animation frame for continuous rotation updates
      requestAnimationFrame(updateRotation);
    };


    // Set the start time when the component mounts
    startTimeRef.current = Date.now();
    // Request the initial animation frame to start rotation
    requestAnimationFrame(updateRotation);

    // Function to reset the start time when the component unmounts
    return () => {
      startTimeRef.current = null;
    };
  }, [time]);


  return (
    <View>
      <Svg height="200" width="200">
        <G>
            <Circle
                cx="100"
                cy="100"
                r="100"
                stroke={colors.black}
                strokeWidth="0"
                fill={'#515255'}
            />
          <Circle cx="100" cy="100" r="80" fill="black" />
        </G>
        <Circle
            cx="100"
            cy="10"
            r="9"
            fill={colors.pink}
            transform={`rotate(${rotation} 100 100)`}
        />
      </Svg>
    </View>
  );
};

export default Clock;
