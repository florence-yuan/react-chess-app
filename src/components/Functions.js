export function lsGet(str) {
    return JSON.parse(localStorage.getItem(str));
}

export function lsSet(str, obj) {
    localStorage.setItem(str, JSON.stringify(obj));
}

export function toTitleCase(str) {
    return str[0].toUpperCase() + str.slice(1);
}