import React, { useState, useContext, useEffect } from 'react'
import { Theme } from '../../../services/context/themeContext'
import { Auth } from '../../../services/context/useAuthentication'
import Button from '../../../components/customButton/Button'
import CustomCheckbox from '../../../components/customCheckbox/CustomCheckbox'
import CustomCloseButton from '../../../components/closeButton/CustomCloseButton'
import ColorPicker from './ColorPicker/ColorPicker'

import style from './Menu.module.css'

const Menu = ({ show, toggleMenuHandler }) => {
    const { theme, updateTheme, onChangeTheme } = useContext(Theme);
    const { auth, logOut } = useContext(Auth);

    const [localTheme, setLocalTheme] = useState(theme);

    useEffect(() => {
        const doc = document.documentElement

        doc.style.setProperty('--body-color', localTheme.bodyBackgroundColor);

        doc.style.setProperty('--main-color', localTheme.objectColor);
        doc.style.setProperty('--main-color-hover', localTheme.objectColorHover);

        doc.style.setProperty('--text-color', localTheme.textColor);
        doc.style.setProperty('--button-text-color', localTheme.buttonTextColor);
    }, [theme, localTheme])
    
    const handleChange = name => event => {
        if(name === 'allowLandingPage') setLocalTheme({ ...theme, [name]: event.target.checked })
        onChangeTheme(name, event);
    }
    
    const handleChangePicker = (option, color) => {
        setLocalTheme({ ...localTheme, [option]: color })
    }; 

    const returnPreviouseColor = (option, color) => {
        setLocalTheme({ ...localTheme, [option]: color })
    }

    const saveTheme = () => {
        updateTheme(localTheme);
        toggleMenuHandler();
    }
    
    return ( 
        <aside className={`${style.menu} ${show ? style.active : ''}`}>

            <CustomCloseButton  closeModal={toggleMenuHandler}  />
            
            {auth && 
                <div 
                    onClick={() => {
                        logOut();
                        toggleMenuHandler();
                    }}
                    className={style.exit}
                >
                    Exit
                </div>
            }

            <div className={style.meneItems}>

                <div className={style.group}>
                    <p>Animation</p>
                    <CustomCheckbox 
                        fieldName='allowLandingPage' 
                        checked={theme.allowLandingPage || ''} 
                        handleChange={(e) => handleChange(e)} 
                    />
                </div>
                
                <h3 className={style.title}>You can to change colors:</h3>

                <div className={style.reverse}>

                    <div className={style.group}>
                        <p>Button Text</p>
                        <ColorPicker 
                            name="buttonTextColor"
                            localTheme={localTheme.buttonTextColor} 
                            theme={theme.buttonTextColor} 
                            handleChangePicker={(color, name) => handleChangePicker(name, color.hex)} 
                            returnPreviouseColor={() => returnPreviouseColor('buttonTextColor', theme.buttonTextColor)} 
                        />
                    </div>   
                    
                    <div className={style.group}>
                        <p>Text</p>
                        <ColorPicker 
                            name="textColor"
                            localTheme={localTheme.textColor} 
                            theme={theme.textColor} 
                            handleChangePicker={(color, name) => handleChangePicker(name, color.hex)} 
                            returnPreviouseColor={() => returnPreviouseColor('textColor', theme.textColor)} 
                        />
                    </div>

                    <div className={style.group}>
                        <p>Objects Hover</p>
                        <ColorPicker 
                            name="objectColorHover"
                            localTheme={localTheme.objectColorHover} 
                            theme={theme.objectColorHover} 
                            handleChangePicker={(color, name) => handleChangePicker(name, color.hex)} 
                            returnPreviouseColor={() => returnPreviouseColor('objectColorHover', theme.objectColorHover)} 
                        />
                    </div>  

                    <div className={style.group}>
                        <p>Objects</p>
                        <ColorPicker 
                            name="objectColor"
                            localTheme={localTheme.objectColor} 
                            theme={theme.objectColor} 
                            handleChangePicker={(color, name) => handleChangePicker(name, color.hex)} 
                            returnPreviouseColor={() => returnPreviouseColor('objectColor', theme.objectColor)} 
                        />
                    </div>     

                    {!theme.allowLandingPage && <div className={style.group}>
                        <p>Background</p>
                        <ColorPicker 
                            name="bodyBackgroundColor"
                            localTheme={localTheme.bodyBackgroundColor} 
                            theme={theme.bodyBackgroundColor} 
                            handleChangePicker={(color, name) => handleChangePicker(name, color.hex)} 
                            returnPreviouseColor={() => returnPreviouseColor('bodyBackgroundColor', theme.bodyBackgroundColor)} 
                        />
                    </div>}

                </div>

                <Button title="Save" clickHandler={saveTheme} type="button" />

            </div>
        </aside>
    )
}

export default Menu