import React, { useState } from 'react';
import TextareaAutosize from "react-textarea-autosize";
import Button from '../../../components/customButton/Button';
import CustomModal from '../../../components/customModal/customModal';
import CustomCloseButton from '../../../components/closeButton/CustomCloseButton';
import { AddSentence } from '../../../services/services';

import style from './AddSentences.module.css';
import { consoleLog } from '../../../services/common';

function AddSentences({ modalIsOpen, closeModal, itemId, updateWords, toggleLoader }) {
    const [sentences, setSentences] = useState('');
    const [errors, setErrors] = useState({});

    const submitForm = (e) => {
        e.preventDefault();
        AddSentence(itemId, {sentences: sentences})
            .then(res => {
                toggleLoader();
                if(res.status === 201) {
                    closeModal();
                    setSentences('');
                    updateWords(res.data.words);  
                } else if(res.data.status === 400) {
                    setErrors(res.data.errors);
                }
            })
            .catch(error => {
                consoleLog(error);
            })
    }   
    
    const onChangeHandler = (input) => (event) => {
        setSentences(event.target.value)
        setErrors({...errors, [input]: null });
    }

    return (
        <CustomModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
        >
            <div className={style.popup}>
                <CustomCloseButton closeModal={closeModal} />
                    <form onSubmit={(e) => submitForm(e)}>
                        <h3>Add Sentence</h3>
                        <div className={style.formGroup}>
                            <div className={style.inputGroup}>
                                <label htmlFor="foreign" />
                                    <TextareaAutosize
                                        rowsmax={3}
                                        type="text"
                                        placeholder="Type Here"
                                        value={sentences}
                                        className={style.messageTextField}
                                        onChange={onChangeHandler('foreign')}
                                    />
                                {errors['foreign'] && <span className={style.error}>{errors['foreign']}</span>}
                            </div>
                            <Button title="Save" type="submit" clickHandler={() => toggleLoader()} />
                        </div>
                    </form>
            </div>
        </CustomModal>
    )
}

export default AddSentences;
