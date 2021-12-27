import React, { useContext } from 'react'
import Login from '../../authentication/login/Login'
import { Auth } from "../../../services/context/useAuthentication";

import style from './Header.module.css'

function Header() {
    const { auth, clientInfo, logOut } = useContext(Auth);
    const exitHandler = () => logOut();
    return (
        <div className={style.header}>
            { auth ?
                <div className={style.navigation}>
                    <div>Hi, {clientInfo && clientInfo.username}</div>
                    <div className={style.exit} onClick={exitHandler}>Exit</div>
                </div>
                :
                <Login />
            }
        </div>
    )
}

export default Header
