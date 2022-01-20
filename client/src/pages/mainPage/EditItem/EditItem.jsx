import React, {useEffect, useState} from 'react'
import Input from "../../../components/customInput/Input";
import Button from "../../../components/customButton/Button";
import CustomModal from '../../../components/customModal/customModal'
import { UpdatedWord } from "../../../services/services";

import style from './EditItem.module.css'
import CustomCloseButton from "../../../components/closeButton/CustomCloseButton";

function EditItem({ modalIsOpen, closeModal, item, updateWords }) {
    const [form, setForm] = useState({
        national: item.national,
        foreign: item.foreign,
        id: item._id
    })

    useEffect(() => {
        setForm({ national: item.national, foreign: item.foreign, id: item._id })
    }, [item])

    const onChangeHandler = (input) => (event) => {
        setForm({ ...form, [input]: event.target.value });
    }

    const submitForm = (e) => {
        e.preventDefault();
        UpdatedWord(form.id, form)
            .then(res => {
                console.log(res.data);
                updateWords(res.data.words, res.data.favoriteWords)
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
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="foreign" />
                            <Input
                                placeholder="Foreign Language"
                                name="foreign"
                                value={form.foreign}
                                onChangeHandler={onChangeHandler('foreign')}
                            />
                        </div>
                        <Button title="Save" type="submit" clickHandler={() => console.log(1)} />
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}

export default EditItem
