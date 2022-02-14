import React, { useState } from "react";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../common";

export const Theme = React.createContext({});

export const useTheme = () => {
    const [theme, setTheme] = useState({
        allowLandingPage: true,
        bodyBackgroundColor: '#282525'
    });

    const onChangeTheme = (option, event) => {
        if(option === 'allowLandingPage') setTheme({ ...theme, [option]: event.target.checked })
    }

    return {
        theme,
        onChangeTheme
    }
}
