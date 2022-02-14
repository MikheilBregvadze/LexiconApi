import React, { useState } from 'react'
import { ChromePicker } from "react-color";
import style from './ColorPicker.module.css'

const ColorPicker = ({bodyBackgroundColor, themeBodyBackgroundColor, handleChangePicker, returnPreviouseColor}) => {
    const [showColorPicker, setshowColorPicker] = useState(false);
  return (
      <>
        <div className={style.apply}>
            {(bodyBackgroundColor !== themeBodyBackgroundColor) && showColorPicker && <div
                className={style.toggleColorPicker}  
                style={{backgroundColor: themeBodyBackgroundColor}}
                onClick={() => {setshowColorPicker(false); returnPreviouseColor();}} 
            />}
                
            <div 
                style={{backgroundColor: bodyBackgroundColor}}
                className={style.toggleColorPicker}  
                onClick={() => setshowColorPicker(!showColorPicker)}
            />
        </div>
        {showColorPicker && 
            <div className={style.colorPicker}>
                <ChromePicker
                    color={bodyBackgroundColor}
                    onChange={handleChangePicker}
                />
            </div>
        }
      </>
  )
}

export default ColorPicker