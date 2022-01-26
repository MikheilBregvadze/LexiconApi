import React, { useState } from 'react';
import TextareaAutosize from "react-textarea-autosize";
import Button from '../../../components/customButton/Button';
import CustomModal from '../../../components/customModal/customModal';
import CustomCloseButton from '../../../components/closeButton/CustomCloseButton';
import { AddSentence } from '../../../services/services';

import style from './AddSentences.module.css';
import { consoleLog } from '../../../services/common';

function AddSentences({ modalIsOpen, closeModal, itemId, updateWords }) {
    const [sentences, setSentences] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        AddSentence(itemId, {sentences: sentences})
            .then(res => {
                if(res.status === 201) {
                    closeModal();
                    setSentences('');
                    updateWords(res.data.words);  
                }
            })
            .catch(error => {
                consoleLog(error);
            })
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
                                    onChange={(event) => setSentences(event.target.value)}
                                />
                        </div>
                        <Button title="Save" type="submit" clickHandler={() => console.log(1)} />
                    </div>
                </form>
        </div>
    </CustomModal>
  )
}

export default AddSentences;
