export const getCurrentTimeInTimezone = (timezone = "UTC") => {
    try {
        const date = new Date();
        return date.toLocaleTimeString('en-US', {
            timeZone: timezone,
            hour12: true,
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
    } catch (error) {
        console.error('Error determining current time:', error);
        return null;
    }
}