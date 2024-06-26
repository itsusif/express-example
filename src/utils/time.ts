export const formatTime = (time: number) => {

    if (time < 1000) return `${time}ms`;
    if (time < 60000) return `${Math.round(time / 1000).toFixed(2)}s`;
    if (time < 3600000) return `${Math.round(time / 60000).toFixed(2)}m`;
    return `${Math.round(time / 3600000).toFixed(2)}h`;
}