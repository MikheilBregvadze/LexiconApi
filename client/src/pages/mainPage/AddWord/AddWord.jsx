import React, { useState } from 'react';
import Input from '../../../components/customInput/Input';
import Button from '../../../components/customButton/Button';
import { ClientAddWord } from '../../../services/services';

import style from './AddWord.module.css';

const AddWord = ({ setWords }) => {
    const [form, setForm] = useState({
        national: '',
        foreign: ''
    })
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const submitForm = (e) => {
        e.preventDefault();
        ClientAddWord(form)
            .then(res => {
                if(res.status === 201) {
                    setWords(res.data.words);
                    setForm({ national: '', foreign: '' });
                } else if(res.data.status === 400) {
                    if(res.data.errorMessage) {
                        setErrorMessage(res.data.errorMessage);
                        setForm({
                            national: '',
                            foreign: ''
                        });
                    } else {
                        setErrorMessage(null);
                        setErrors(res.data.errors);
                    }
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    const onChangeHandler = (input) => (event) => {
        setErrorMessage(null);
        setForm({ ...form, [input]: event.target.value });
        setErrors({...errors, [input]: null });
    }
    return (
        <form onSubmit={submitForm}>
            <div className={style.formGroup}>
                <label htmlFor="national" />
                <Input
                    placeholder="Enter National Word"
                    name="national"
                    value={form.national}
                    onChangeHandler={onChangeHandler('national')}
                />
                {errors['national'] && <span className={style.error}>{errors['national']}</span>}
            </div>
            <div className={style.formGroup}>
                <label htmlFor="foreign" />
                <Input
                    placeholder="Enter Foreign Word"
                    name="foreign"
                    value={form.foreign}
                    onChangeHandler={onChangeHandler('foreign')}
                />
                {errors['foreign'] && <span className={style.error}>{errors['foreign']}</span>}
            </div>
            <Button title="Save" type="submit" clickHandler={() => console.log(1)} />
            {errorMessage &&  <span className={style.errorMessage}>{errorMessage}</span> }
        </form>
    );
};

export default AddWord;
