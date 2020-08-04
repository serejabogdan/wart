export function capitalize(str) {
    if (typeof str != 'string') {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function storage(key = 'wart-state', data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key));
    }
    localStorage.setItem(key, JSON.stringify(data));
}

function fixTime(minutes, seconds) {
    return `${fixUnitOfTime(minutes)}:${fixUnitOfTime(seconds)}`;
}

function fixUnitOfTime(unit) {
    return unit < 10 ? `0${unit}` : `${unit}`;
}

export function $setContext($context, minutes, seconds) {
    $context.change = fixTime(minutes, seconds);
}
