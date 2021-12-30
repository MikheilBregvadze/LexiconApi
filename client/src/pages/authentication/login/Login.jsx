import React, { useState, useContext } from 'react'
import { Auth } from "../../../services/context/useAuthentication"
import { ClientAuthorization } from '../../../services/services'
import Input from '../../../components/customInput/Input'
import Button from '../../../components/customButton/Button'
import style from './Login.module.css'

function Login() {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const { authenticate } = useContext(Auth);
    const onChangeHandler = input => event => {
        setForm({...form, [input]: event.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        ClientAuthorization(form)
            .then(res => {
                if(res.data.token) {
                    authenticate(res.data);
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
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
            <Button title="Login" type="submit" clickHandler={() => console.log(1)} />
        </form>
    )
}

export default Login
