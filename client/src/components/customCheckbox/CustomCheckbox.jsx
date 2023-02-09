import React from 'react'

import style from './CustomCheckbox.module.css'

const CustomCheckbox = ({ fieldName, checked, handleChange }) => {
    return (
        <label className={style.checkbox}>
            <input 
                name={fieldName} 
                type="checkbox" 
                checked={checked}
                onChange={handleChange(fieldName)}
            />
            <span />
        </label>
    )
}

export default CustomCheckbox