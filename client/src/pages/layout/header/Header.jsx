import React, { useState, useContext } from 'react'
import FontAwesome from "react-fontawesome"
import Login from '../../authentication/login/Login'
import Menu from '../../mainPage/Menu/Menu'
import { Auth } from "../../../services/context/useAuthentication"
import Registration from '../../authentication/registration/Registration'

import style from './Header.module.css'

function Header() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const { auth, clientInfo } = useContext(Auth);
    const toggleMenuHandler = () => {
        setToggleMenu(!toggleMenu);
    }
    return (
        <>
            <div className={style.header}> 
                    <div className={style.navigation}>
                        {auth ? <div>Hi, {clientInfo && clientInfo.username}</div> : <div></div>}
                        <div className={style.setting}>
                            <div 
                                className={`${style.cog} ${toggleMenu ? style.animate : ''}`} 
                                onClick={() => setToggleMenu(!toggleMenu)} 
                            >
                                <FontAwesome
                                    name="cog"
                                    className="icon-xl"
                                />
                            </div>
                        </div>
                    </div>
                    
                    {!auth && <div className={style.auth}>
                        <Login />
                        <Registration />
                    </div>}
                    
            </div>
            <Menu show={toggleMenu} toggleMenuHandler={toggleMenuHandler} />
        </>
    )
}

export default Header
