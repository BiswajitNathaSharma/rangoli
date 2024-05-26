function convertSecondsToMinutesSeconds(duration) {
    console.log(typeof duration)
    const durationStr = duration.toString()
    if (durationStr.includes('.')) {
        return duration;
    }
    const seconds = parseInt(durationStr, 10);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Format minutes and seconds with leading zero if necessary
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${formattedMinutes}:${formattedSeconds}`;
    
}
export default convertSecondsToMinutesSeconds