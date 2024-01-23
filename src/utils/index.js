import { MIN_TO_CENTIS, SEC_TO_CENTIS } from "./constants";

/**
 * Ensures consistent two-digit display for each time segment, prepending a leading zero for single-digit values.
 * Validates input to ensure segment is a non- negative number with two or fewer digits
 * @param {number} segment - A numerical value of a time segment. 
 *                           A segment would be the numerical value of either the minute, seconds or centiseconds of the timestamp
 * @returns {string} the formatted time segment, padded with a leading zero if necessary
 */
export const formatTimeSegment = (segment) => {
    if (segment.toString().length > 2 || isNaN(segment) || segment < 0) return "";
    return segment.toString().padStart(2, '0');
}

export const formatTimestamp = (time) => {
    return `${formatTimeSegment(time[0])}:${formatTimeSegment(time[1])}:${formatTimeSegment(time[2])}`
  }

/**
 * Calculates the total recorded lap time in segments, representing minutes, seconds, and centiseconds.
 *
 * @param {number[][]} laps - An array of lap times, where each lap is an array containing [minutes, seconds, centiseconds].
 * @returns {number[]} - An array representing the total lap time in the format [minutes, seconds, centiseconds].
 */
export const getTotalRecordedLapTime = (laps) => {
    return laps.reduce((accumulator, current) => {
        accumulator[0] += current[0]
        accumulator[1] += current[1]
        accumulator[2] += current[2]
        return accumulator;
    }, [0, 0, 0])
}

/**
 * Converts time segments (minutes, seconds, centiseconds) into a total number of centiseconds.
 *
 * @param {number[]} segments - An array representing time segments in the format [minutes, seconds, centiseconds].
 * @returns {number} - The total time in centiseconds.
 */
export const convertSegmentsToCentis = (segments) => {
    return segments[0] * MIN_TO_CENTIS + segments[1] * SEC_TO_CENTIS + segments[2]
};

/**
 * Converts a total time in centiseconds back into time segments (minutes, seconds, centiseconds).
 *
 * @param {number} centis - The total time in centiseconds.
 * @returns {number[]} - An array representing the time in segments [minutes, seconds, centiseconds].
 */
export const convertCentisToSegments = (centis) => {
    const minRemainder = centis % MIN_TO_CENTIS;
    const minSegment = (centis - minRemainder)/MIN_TO_CENTIS;

    const secRemainder = minRemainder % SEC_TO_CENTIS;
    const secSegment = (minRemainder - secRemainder)/SEC_TO_CENTIS;

    const centisSegment = secRemainder;
    return [minSegment, secSegment, centisSegment]
}