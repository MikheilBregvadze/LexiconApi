import React, { useState } from 'react'
import { ChromePicker } from "react-color";
import style from './ColorPicker.module.css'

const ColorPicker = ({name, localTheme, theme, handleChangePicker, returnPreviouseColor}) => {
    const [showColorPicker, setshowColorPicker] = useState(false);
    const handleChangePicker1 = (e) => {
        handleChangePicker(e, name)
    }

  return (
      <>
        <div className={style.apply}>
            {(localTheme !== theme) && showColorPicker && <div
                className={style.toggleColorPicker}  
                style={{backgroundColor: theme}}
                onClick={() => {setshowColorPicker(false); returnPreviouseColor();}} 
            />}
                
            <div 
                style={{backgroundColor: localTheme}}
                className={style.toggleColorPicker}  
                onClick={() => {setshowColorPicker(!showColorPicker)}}
            />
        </div>
        {showColorPicker && 
            <div className={style.colorPicker}>
                <ChromePicker
                    color={localTheme}
                    onChange={handleChangePicker1}
                />
            </div>
        }
      </>
  )
}

export default ColorPicker