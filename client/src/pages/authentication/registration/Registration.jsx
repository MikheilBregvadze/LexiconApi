import React, { useState, useEffect, useContext } from 'react'
import CustomModal from '../../../components/customModal/customModal'
import CustomCloseButton from '../../../components/closeButton/CustomCloseButton'
import Input from '../../../components/customInput/Input'
import Button from '../../../components/customButton/Button'
import { Auth } from "../../../services/context/useAuthentication"
import { ClientRegistration } from '../../../services/services'
import { consoleLog } from '../../../services/common'
import style from './Registration.module.css'

function Registration({ modalIsOpen, closeModal }) {
    const [showModal, setShowModal] = useState(false);
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
        setForm({...form, [input]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        ClientRegistration(form)
            .then(res => {
                if(res.data.token) {
                    setShowModal(false);
                    authenticate(res.data);
                }
            })
            .catch(error => {
                consoleLog(error)
            })
    }
    const closeModalHandler = () => {
        // closeModal();
        setShowModal(false);
    }
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
                <form className={style.form} onSubmit={handleSubmit}>
                    <div className={style.formGroup}>
                        <label htmlFor="username"></label>
                        <Input
                            placeholder="User Name"
                            name="name"
                            type="text"
                            value={form.username}
                            onChangeHandler={onChangeHandler('username')}
                        />
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
                    </div>
                    <Button title="Register" type="submit" clickHandler={() => console.log(1)} />
                </form>
            </CustomModal>
        </>
    )
}

export default Registration
