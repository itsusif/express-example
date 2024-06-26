export function uniqueID(options: {
    length?: number;
    prefix?: string;
    suffix?: string;
} = {
        length: 9,
        prefix: '',
        suffix: '',
    }) {
    const { length = 9, prefix, suffix } = options;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    if (prefix && suffix)
        return `${prefix}${result}${suffix}`;
    if (prefix)
        return `${prefix}${result}`;
    if (suffix)
        return `${result}${suffix}`;
    return result;
};