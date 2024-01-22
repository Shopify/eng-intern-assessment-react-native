/**
 * Ensures consistent two-digit display for each time segment, prepending a leading zero for single-digit values.
 * Validates input to ensure segment is a non- negative number with two or fewer digits
 * @param {number} segment - A numerical value of a time segment. 
 *                           A segment would be the numerical value of either the minute, seconds or centiseconds of the timestamp
 * @returns {string} the formatted time segment, padded with a leading zero if necessary
 */
export const formatTimeSegment = (segment) => {
    if(segment.toString().length > 2 || isNaN(segment) || segment < 0) return "";
    return segment.toString().padStart(2, '0');
}