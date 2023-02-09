import React, { useState } from "react";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../common";

export const Theme = React.createContext({});

export const useTheme = () => {
    const [theme, setTheme] = useState(getItemFromLocalStorage('theme') || {
        allowLandingPage: true,
        textColor: '#ffffff',
        buttonTextColor: '#000000',
        objectColor: '#faebd7',
        objectColorHover: '#e3d3be',
        bodyBackgroundColor: '#282525',
    });

    const onChangeTheme = (option, event) => {
        if(option === 'allowLandingPage') setTheme({ ...theme, [option]: event.target.checked })
        else setTheme({ ...theme, [option]: event })
    }

    const updateTheme = (theme) => {
        setItemToLocalStorage('theme', theme);
        setTheme(theme);
    }

    return {
        theme,
        updateTheme,
        onChangeTheme
    }
}
