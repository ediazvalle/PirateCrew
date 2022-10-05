
export const getLocalStorage = (key) => {
    return localStorage.getItem(key);
};
export const getLocalStorages = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const deleteLocalStorage = (key) => {
    localStorage.removeItem(key);
};

