import React, { useState } from 'react';
import { useClickOutside } from '../../../services/context/outsideClick';
import Input from '../../../components/customInput/Input';
import Button from '../../../components/customButton/Button';
import { ClientAddWord } from '../../../services/services';

import style from './AddWord.module.css';

const AddWord = ({ setWords, toggleLoader }) => {
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
                toggleLoader();
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
    let domNode = useClickOutside(() => {
        setErrors({})
    })
    return (
        <form onSubmit={submitForm} ref={domNode}>
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
            <Button title="Save" type="submit" clickHandler={() => toggleLoader()} />
            {errorMessage &&  <span className={style.errorMessage}>{errorMessage}</span> }
        </form>
    );
};

export default AddWord;
