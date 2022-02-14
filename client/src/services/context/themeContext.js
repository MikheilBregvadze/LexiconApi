import React, { useState } from "react";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../common";

export const Theme = React.createContext({});

export const useTheme = () => {
    const [form, setForm] = useState(getItemFromLocalStorage('themeForm'));

    const onChangeTheme = (option, value) => {
        
    }

    return {
        form,
        onChangeTheme
    }
}
