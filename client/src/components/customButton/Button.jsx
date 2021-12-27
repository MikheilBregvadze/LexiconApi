import React from 'react'
import style from './Button.module.css'

function Button({ title, clickHandler, type }) {
    return <button
            className={style.button}
            type={type}
            onClick={clickHandler}
        >
        {title}
    </button>
}

export default Button
