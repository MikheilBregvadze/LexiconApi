import React from 'react'
import style from './Input.module.css'

function Input({ placeholder, type, name, value, onChangeHandler }) {
    return <input
        placeholder={placeholder}
        className={style.input}
        type={type}
        name={name}
        value={value}
        onChange={onChangeHandler}
    />
}

export default Input
