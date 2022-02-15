import React from "react"
import FontAwesome from "react-fontawesome"

import style from './CustomCloseButton.module.css'

function CustomCloseButton({ closeModal }) {
    return (
        <div
            onClick={() => closeModal()}
            className={style.close}
        >
            <FontAwesome
                name="times"
                className={`icon-md`}
            />
        </div>
    )
}

export default CustomCloseButton