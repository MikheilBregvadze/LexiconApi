export const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const hostname = process.env.REACT_APP_API_URL || window.location.hostname;

export const GetBaseUrl = () => {
    return isLocalhost ? 'http://localhost:5000' : 'https://lexicone.herokuapp.com';
}

export const consoleLog = (msg) => {
    if(!isLocalhost) return;
    console.log(msg);
}

export const setItemToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const getItemFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}
