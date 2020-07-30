export function capitalize(str) {
    if (typeof str != 'string') {
        return '';
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key));
    }
    localStorage.setItem(key, JSON.stringify(data));
}

export function fixTime(min, sec) {
    return `${fixMinutes(min)}:${fixSeconds(sec)}`;
}

function fixMinutes(min) {
    return min < 10 ? `0${min}` : `${min}`;
}

function fixSeconds(sec) {
    return sec < 10 ? `0${sec}` : `${sec}`;
}
