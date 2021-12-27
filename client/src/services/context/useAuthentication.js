import React, { useState } from "react";
// import {useHistory} from 'react-router-dom';
import { getItemFromLocalStorage, setItemToLocalStorage } from "../common";
// import { GetClientInfo } from "../services";

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
        localStorage.removeItem('accessToken');
    }
    return {
        auth,
        authenticate,
        logOut,
        clientInfo
    }
}
