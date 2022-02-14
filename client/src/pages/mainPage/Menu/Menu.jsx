import React, { useState, useContext, useEffect } from 'react'
import { Theme } from '../../../services/context/themeContext';
import CustomCheckbox from '../../../components/customCheckbox/CustomCheckbox';
import CustomCloseButton from '../../../components/closeButton/CustomCloseButton';
import ColorPicker from './ColorPicker/ColorPicker';

import style from './Menu.module.css';

const Menu = ({ show, toggleMenuHandler }) => {
    const { theme, onChangeTheme } = useContext(Theme);
    
    const [bodyBackgroundColor, setBodyBackgroundColor] = useState(theme.bodyBackgroundColor);

    useEffect(() => {
        if(!theme.allowLandingPage) {
            const doc = document.documentElement
            doc.style.setProperty('--body-color', bodyBackgroundColor);
        }
    }, [theme, bodyBackgroundColor])

    const handleChange = name => event => {
        onChangeTheme(name, event);
    }
    
    const handleChangePicker = (color) => {
        setBodyBackgroundColor(color.hex);
    }; 
    

    return ( 
        <aside className={`${style.menu} ${show ? style.active : ''}`}>
            <CustomCloseButton  closeModal={toggleMenuHandler}  />
            <div className={style.meneItems}>
                <div className={style.group}>
                    <p>Animation</p>
                    <CustomCheckbox 
                        fieldName='allowLandingPage' 
                        checked={theme.allowLandingPage || ''} 
                        handleChange={(e) => handleChange(e)} 
                    />
                </div>

                
                {!theme.allowLandingPage && <div className={style.group}>
                    <p>Background</p>
                    <ColorPicker 
                        bodyBackgroundColor={bodyBackgroundColor} 
                        themeBodyBackgroundColor={theme.bodyBackgroundColor} 
                        handleChangePicker={handleChangePicker} 
                        returnPreviouseColor={() => setBodyBackgroundColor(theme.bodyBackgroundColor)} 
                    />
                </div>}
            </div>
        </aside>
    )
}

export default Menu