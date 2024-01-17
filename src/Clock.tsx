import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Svg, Circle, Line, G } from 'react-native-svg';

// Import the color configuration
import colors from '../config/colors';

interface ClockProps {
  time: number;
}

const Clock: React.FC<ClockProps> = ({ time }) => {
  const [rotation, setRotation] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const updateRotation = () => {
      if (startTimeRef.current !== null) {
        const remainingRotation = (time / 60000) * 360;
        setRotation(remainingRotation);
      }
      requestAnimationFrame(updateRotation);
    };

    startTimeRef.current = Date.now();
    requestAnimationFrame(updateRotation);

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
