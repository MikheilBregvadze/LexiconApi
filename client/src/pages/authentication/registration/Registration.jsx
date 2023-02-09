import React, { useState, useEffect, useContext } from 'react'
import { useClickOutside } from '../../../services/context/outsideClick'
import CustomModal from '../../../components/customModal/customModal'
import CustomCloseButton from '../../../components/closeButton/CustomCloseButton'
import Input from '../../../components/customInput/Input'
import Button from '../../../components/customButton/Button'
import { Auth } from "../../../services/context/useAuthentication"
import { ClientRegistration } from '../../../services/services'
import { consoleLog } from '../../../services/common'
import style from './Registration.module.css'

function Registration({ modalIsOpen }) {
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState({});
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirm_password: ''
    });
    const { authenticate } = useContext(Auth);

    useEffect(() => {
        setShowModal(modalIsOpen);
    }, [modalIsOpen])
    
    const onChangeHandler = input => event => {
        setError({ ...error, [input]: null });
        setForm({...form, [input]: event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        ClientRegistration(form)
            .then(res => {
                if(res.data.token) {
                    setShowModal(false);
                    authenticate(res.data);
                } else {
                    if(res.data.status === 400)
                        setError(res.data.error)
                }
            })
            .catch(error => {
                consoleLog(error)
            })
    }
    const closeModalHandler = () => {
        setError({});
        setForm({
            username: '',
            password: '',
            confirm_password: ''
        })
        setShowModal(false);
    }
    let domNode = useClickOutside(() => {
        setError({})
    })
    return (
        <>
            <Button 
                type="button" 
                title="Register" 
                clickHandler={() => setShowModal(true)} 
            />
            <CustomModal
                modalIsOpen={showModal}
                closeModal={closeModalHandler}
            >
                <CustomCloseButton  closeModal={closeModalHandler} />
                <form className={style.form} onSubmit={handleSubmit} ref={domNode}>
                    <div className={style.formGroup}>
                        <label htmlFor="username"></label>
                        <Input
                            placeholder="User Name"
                            name="name"
                            type="text"
                            value={form.username}
                            onChangeHandler={onChangeHandler('username')}
                        />
                        {error['username'] && <span className={style.error}>{error['username']}</span>}
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="password"></label>
                        <Input
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={form.password}
                            onChangeHandler={onChangeHandler('password')}
                        />
                        {error['password'] && <span className={style.error}>{error['password']}</span>}
                    </div>
                    
                    <div className={style.formGroup}>
                        <label htmlFor="confirm_password"></label>
                        <Input
                            placeholder="Confirm Password"
                            type="password"
                            name="confirm_password"
                            value={form.confirm_password}
                            onChangeHandler={onChangeHandler('confirm_password')}
                        />
                        {error['confirm_password'] && <span className={style.error}>{error['confirm_password']}</span>}
                    </div>
                    <Button title="Register" type="submit" />
                </form>
            </CustomModal>
        </>
    )
}

export default Registration
