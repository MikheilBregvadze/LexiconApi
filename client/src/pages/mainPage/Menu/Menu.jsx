import React, { useState } from 'react'
import CustomCheckbox from '../../../components/customCheckbox/CustomCheckbox';
import CustomCloseButton from '../../../components/closeButton/CustomCloseButton';
import style from './Menu.module.css';

const Menu = ({ show, toggleMenuHandler }) => {
    const [form, setForm] = useState({
        theme: true
    });

    const handleChange = name => event => {
        if(name === 'theme') setForm({ ...form, [name]: event.target.checked })
    }
    
    return ( 
        <div className={`${style.menu} ${show ? style.active : ''}`}>
            <CustomCloseButton  closeModal={toggleMenuHandler}  />
            <div>
                <CustomCheckbox 
                    fieldName='theme' 
                    checked={form.theme} 
                    handleChange={(e) => handleChange(e)} 
                />
            </div>
        </div>
    )
}

export default Menu