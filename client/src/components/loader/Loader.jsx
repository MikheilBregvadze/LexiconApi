import React from 'react';
import style from './Loader.module.css';

export const Loader = () => {
    return <div className={style.popup}>
        <div className={style.loader} />
    </div>
};
