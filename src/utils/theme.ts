/**
 * @author Marcin Koziel
 * @date 01/19/2024
 */

import { Dimensions, Platform, StyleSheet } from "react-native";

const COLOR_WHITE = '#FFFFFF';
const COLOR_GREEN = '#0DFFAA';
const COLOR_BLACK = '#101010';
const COLOR_DARK_GRAY = '#222224';
const FONT_DIGITAL = 'Digital-7';
const FONT_DIGITAL_MONO = 'Digital-7 Mono';

const { width: deviceWidth } = Dimensions.get('window');
const buttonSize = deviceWidth * 0.25;

/**
 * Returns the width of the device screen.
 * @returns The width of the device screen.
 */
export const getStyles = () => {
  return StyleSheet.create({
    // Button styles
    button: {
      alignItems: 'center',
      backgroundColor: COLOR_DARK_GRAY,
      borderRadius: buttonSize / 2,
      height: buttonSize,
      justifyContent: 'center',
      marginHorizontal: deviceWidth * 0.05,
      width: buttonSize,
      ...Platform.select({
        ios: {
          shadowColor: COLOR_WHITE,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }),
    },
    buttonContainer: {
      flexDirection: 'row',
      marginBottom: 30,
    },
    buttonText: {
      color: COLOR_WHITE,
      fontSize: deviceWidth * 0.045,
      fontWeight: 'bold',
    },

    // Container styles
    container: {
      alignItems: 'center',
      backgroundColor: COLOR_BLACK,
      flex: 1,
      justifyContent: 'space-around',
      paddingTop: 30,
    },

    // Lap styles
    bestLap: {
      color: '#00FF00',
    },
    worstLap: {
      color: '#FF0000',
    },
    lap: {
      alignItems: 'center',
      borderBottomColor: '#2D2D2D',
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
    lapText: {
      color: COLOR_WHITE,
      flex: 1,
      fontSize: deviceWidth * 0.04,
      textAlign: 'left',
    },
    lapTime: {
      color: COLOR_WHITE,
      flex: 1,
      fontSize: deviceWidth * 0.04,
      textAlign: 'right',
    },
    lapsContainer: {
      alignSelf: 'stretch',
      marginHorizontal: deviceWidth * 0.05,
    },
    scrollContentContainer: {
      paddingHorizontal: deviceWidth * 0.05,
    },

    // Text styles
    text: {
      color: COLOR_WHITE,
      fontSize: deviceWidth * 0.05,
    },
    timeLabel: {
      color: COLOR_WHITE,
      fontSize: 12,
      textTransform: 'uppercase',
    },

    // Time display styles
    smallTimeDisplay: {
      color: COLOR_GREEN,
      fontFamily: FONT_DIGITAL_MONO,
      fontSize: deviceWidth * 0.125,
      marginHorizontal: deviceWidth * 0.025,
    },
    timeColon: {
      color: COLOR_GREEN,
      fontFamily: FONT_DIGITAL,
      fontSize: deviceWidth * 0.225,
      marginHorizontal: deviceWidth * 0.025,
      width: deviceWidth * 0.025,
    },
    timeDisplay: {
      color: COLOR_GREEN,
      fontFamily: FONT_DIGITAL_MONO,
      fontSize: deviceWidth * 0.225,
      marginHorizontal: deviceWidth * 0.025,
    },
    timeDisplayContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    timeSegment: {
      alignItems: 'center',
    },
  });
};