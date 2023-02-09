import React, { useState, useContext } from 'react'
import { Auth } from "../../../services/context/useAuthentication"
import { ClientAuthorization } from '../../../services/services'
import { useClickOutside } from '../../../services/context/outsideClick'
import Input from '../../../components/customInput/Input'
import Button from '../../../components/customButton/Button'
import style from './Login.module.css'

function Login() {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState({});
    const { authenticate } = useContext(Auth);
    const onChangeHandler = input => event => {
        setError({ ...error, [input]: null });
        setForm({...form, [input]: event.target.value});
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        ClientAuthorization(form)
            .then(res => {
                if(res.data.token) {
                    authenticate(res.data);
                } else {
                    if(res.data.status === 400)
                        setError(res.data.error)
                }
            })
            .catch(error => {
                setError({ username: error.response.data.error })
            })
    }
    let domNode = useClickOutside(() => {
        setError({})
    })
    return (
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
            <Button title="Login" type="submit" />
        </form>
    )
}

export default Login
