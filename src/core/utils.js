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