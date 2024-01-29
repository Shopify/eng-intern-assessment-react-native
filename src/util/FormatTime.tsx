
// export default function formatTime(time: number): string {
//     const hours = Math.floor(time / 3600000);
//     const minutes = Math.floor((time % 3600000) / 60000);
//     const seconds = ((time % 60000) / 1000).toFixed(0);
//
//     const formattedHours = hours.toString().padStart(2, '0');
//     const formattedMinutes = minutes.toString().padStart(2, '0');
//     const formattedSeconds = seconds.toString().padStart(2, '0');
//
//     return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
//
//
// };
//

export default function formatTime(time: number): string {
    // Calculate minutes
    const minutes = Math.floor(time / 60000);

    // Calculate remaining seconds after subtracting minutes
    const seconds = Math.floor((time % 60000) / 1000);

    // Calculate remaining milliseconds after subtracting minutes and seconds
    const milliseconds = Math.floor(time % 1000);

    // Format each part with leading zeros if needed
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = milliseconds.toString().padStart(3, '0').substring(0, 2); // Take only the first two digits

    // Return the formatted time string
    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}
