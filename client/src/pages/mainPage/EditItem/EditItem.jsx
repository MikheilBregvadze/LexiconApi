import React, {useEffect, useState} from 'react'
import Input from "../../../components/customInput/Input";
import Button from "../../../components/customButton/Button";
import CustomModal from '../../../components/customModal/customModal'
import { UpdatedWord } from "../../../services/services";

import style from './EditItem.module.css'
import CustomCloseButton from "../../../components/closeButton/CustomCloseButton";

function EditItem({ modalIsOpen, closeModal, item, updateWords, toggleLoader }) {
    const [form, setForm] = useState({
        national: item.national,
        foreign: item.foreign,
        id: item._id
    })
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setForm({ national: item.national, foreign: item.foreign, id: item._id })
    }, [item])
    
    const onChangeHandler = (input) => (event) => {
        setForm({ ...form, [input]: event.target.value });
        setErrors({...errors, [input]: null });
    }

    const submitForm = (e) => {
        e.preventDefault();
        UpdatedWord(form.id, form)
            .then(res => {
                if(res.status === 201) {
                    updateWords(res.data.words, res.data.favoriteWords)
                } else if(res.data.status === 400) {
                    setErrors(res.data.errors);
                }
                toggleLoader();
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <CustomModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
        >
            <div className={style.popup}>
                <CustomCloseButton closeModal={closeModal} />
                <h3>Edit Word</h3>
                <form onSubmit={(e) => submitForm(e)}>
                    <div className={style.form}>
                        <div className={style.formGroup}>
                            <label htmlFor="foreign" />
                            <Input
                                placeholder="National Language"
                                name="national"
                                value={form.national}
                                onChangeHandler={onChangeHandler('national')}
                            />
                            {errors['national'] && <span className={style.error}>{errors['national']}</span>}
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="foreign" />
                            <Input
                                placeholder="Foreign Language"
                                name="foreign"
                                value={form.foreign}
                                onChangeHandler={onChangeHandler('foreign')}
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

export default EditItem
