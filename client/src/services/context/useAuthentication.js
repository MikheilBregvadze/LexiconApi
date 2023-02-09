import React, { useState } from "react";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../common";

export const Auth = React.createContext({});

export const useAuthentication = () => {
    const [auth, setAuth] = useState(getItemFromLocalStorage('accessToken'));
    const [clientInfo, setClientInfo] = useState(getItemFromLocalStorage('clientInfo'));


    const authenticate = (data) => {
        setItemToLocalStorage('clientInfo', data);
        setItemToLocalStorage('accessToken', data.token);
        setAuth(data.token);
        setClientInfo(data);
    }

    const logOut = () => {
        setAuth(false);
        // setClientInfo(null);
        localStorage.removeItem('clientInfo');
        localStorage.removeItem('accessToken');
    }
    return {
        auth,
        authenticate,
        logOut,
        clientInfo
    }
}
