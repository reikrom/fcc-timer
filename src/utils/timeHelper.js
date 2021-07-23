export const getNow = () => new Date().getTime();

export const toMs = (minutes) => {
    return minutes * 60 * 1000;
};

export const formatMs = (ms) => {
    let m = Math.floor(ms / 60000);
    let s = Math.floor(ms / 1000) % 60;
    s = (s < 10 ? '0' : '') + s;
    return m + ':' + s;
};

export const formatTimeStampHHMMSS = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const time =
        (hours < 10 ? '0' : '') +
        hours +
        ':' +
        (minutes < 10 ? '0' : '') +
        minutes +
        ':' +
        (seconds < 10 ? '0' : '') +
        seconds;
    return time;
};
