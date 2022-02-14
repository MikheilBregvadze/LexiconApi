import React, { useState, useContext } from 'react'
import FontAwesome from "react-fontawesome"
import Login from '../../authentication/login/Login'
import Menu from '../../mainPage/Menu/Menu'
import { Auth } from "../../../services/context/useAuthentication"
import Registration from '../../authentication/registration/Registration'

import style from './Header.module.css'

function Header() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleDropDown, setToggleDropdown] = useState(false);
    const { auth, clientInfo, logOut } = useContext(Auth);
    const exitHandler = () => logOut();
    const toggleMenuHandler = () => {
        setToggleMenu(!toggleMenu);
    }
    return (
        <>
            <div className={style.header}>
                { auth ?
                    <div className={style.navigation}>
                        <div>Hi, {clientInfo && clientInfo.username}</div>
                        <div className={style.setting}>
                            <div className={style.cog} onClick={() => setToggleDropdown(!toggleDropDown)} >
                                <FontAwesome
                                    name="cog"
                                    className="icon-xl"
                                />
                            </div>
                            <div className={`${style.dropdown} ${toggleDropDown ? style.active : ''}`}>
                                <div className={style.menu} onClick={toggleMenuHandler}>Menu</div>
                                <div className={style.exit} onClick={exitHandler}>Exit</div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={style.auth}>
                        <Login />
                        <Registration />
                    </div>
                }
            </div>
            <Menu show={toggleMenu} toggleMenuHandler={toggleMenuHandler} />
        </>
    )
}

export default Header
