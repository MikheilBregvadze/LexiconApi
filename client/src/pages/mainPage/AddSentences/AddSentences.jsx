import React, { useState } from 'react';
import Input from '../../../components/customInput/Input';
import Button from '../../../components/customButton/Button';
import CustomModal from '../../../components/customModal/customModal';

import style from './AddSentences.module.css';
import CustomCloseButton from '../../../components/closeButton/CustomCloseButton';

function AddSentences({ modalIsOpen, closeModal, itemId, updateWords }) {
    const [sentences, setSentences] = useState('');
    const onChangeHandler = (input) => (event) => { setSentences(event.target.value) };
    
    const submitForm = (e) => {
        e.preventDefault();
    }
  return (
    <CustomModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
    >
        <div className={style.popup}>
            <CustomCloseButton closeModal={closeModal} />
                <form onSubmit={(e) => submitForm(e)}>
                    <div className={style.form}>
                        <div className={style.formGroup}>
                            <label htmlFor="foreign" />
                            <Input
                                placeholder="National Language"
                                name="national"
                                value={sentences}
                                onChangeHandler={onChangeHandler('sentences')}
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
