import { deleteLocalStorage, getLocalStorage, getLocalStorages } from "./localStorage";



export const setAuthentication = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
}

export const isAuthenticated = () => {
    if (getLocalStorages('user') && getLocalStorage('token')) {
        return getLocalStorages('user');
    }  else {
        return false;
    }
}

export const logout = (next) => {
    deleteLocalStorage('user');
    deleteLocalStorage('token');
     next();
   
}