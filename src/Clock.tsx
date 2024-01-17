import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

import colors from '../config/colors';

interface ClockProps {
  time: number;
}

const Clock: React.FC<ClockProps> = ({ time }) => {
  // Calculate the rotation angle based on the elapsed time
  const rotation = (time % 60) * 6; // Each second corresponds to a 6-degree rotation

  return (
    <View>
      <Svg height="200" width="200">
        <G>
          <Circle
            cx="100"
            cy="100"
            r="100"
            stroke={colors.darkgrey}
            strokeWidth="1"
            fill={colors.offwhite}
          />
          <Circle cx="100" cy="100" r="80" fill="black" />
        </G>
        <Circle
          cx="100"
          cy="10"
          r="9.7"
          stroke={colors.darkpink}
          strokeWidth="0.5"
          fill={colors.pink}
          transform={`rotate(${rotation} 100 100)`}
        />
      </Svg>
    </View>
  );
};

export default Clock;
