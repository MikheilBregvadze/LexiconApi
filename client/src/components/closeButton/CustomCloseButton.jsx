import React from "react"
import style from './CustomCloseButton.module.css'

function CustomCloseButton({ closeModal }) {
    return (
        <div
            onClick={() => closeModal()}
            className={style.close}
        />
    )
}

export default CustomCloseButton