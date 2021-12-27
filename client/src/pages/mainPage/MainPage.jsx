import React, { useState, useEffect, useContext } from 'react'
import Input from '../../components/customInput/Input'
import Button from '../../components/customButton/Button'
import { ClientAddWord, GetClientAllWords, DeleteWordById } from '../../services/services'
import { Auth } from '../../services/context/useAuthentication'
import style from './MainPage.module.css'

function MainPage() {
    const [form, setForm] = useState({
        national: '',
        foreign: ''
    })
    const [search, setSearch] = useState('');
    const [words, setWords] = useState([]);
    const [searchedWords, setSearchedWords] = useState([]);
    const { auth } = useContext(Auth);

    const onChangeHandler = (input) => (event) => {
        setForm({ ...form, [input]: event.target.value });
        if(input === 'search') {
            setSearch(event.target.value);
            const value = event.target.value.toLowerCase();
            const searchedItem = words.find(word => word.national.toLowerCase() === value || word.foreign.toLowerCase() === value);
            if(searchedItem) {
                setSearchedWords([words.find(word => word.national.toLowerCase() === value || word.foreign.toLowerCase() === value)]); 
            } else {
                setSearchedWords([]);
            }
        }
    }
    
    const submitForm = (e) => {
        e.preventDefault();
        ClientAddWord(form)
            .then(res => {
                if(res.status === 201) {
                    setWords(res.data.words);
                    setForm({ national: '', foreign: '' });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const deleteWord = (id) => {
        DeleteWordById(id)
            .then(res => {
                if(res.status === 201) {
                    setWords(res.data.words);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        GetClientAllWords()
            .then(res => {
                if(res.status === 201) {
                    setWords(res.data.words);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <>
            {auth && <div className={style.main}>
                <form onSubmit={submitForm}>
                    <div className={style.formGroup}>
                        <label htmlFor="national"></label>
                        <Input
                            placeholder="National Language"
                            name="national"
                            value={form.national}
                            onChangeHandler={onChangeHandler('national')}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="foreign"></label>
                        <Input
                            placeholder="Foreign Language"
                            name="foreign"
                            value={form.foreign}
                            onChangeHandler={onChangeHandler('foreign')}
                        />
                    </div>
                    <Button title="Save" type="submit" clickHandler={() => console.log(1)} />
                </form>
                <div className={style.formGroup + ' ' + style.search}>
                    <label htmlFor="search"></label>
                    <Input
                        placeholder="Search"
                        name="search"
                        value={search}
                        onChangeHandler={onChangeHandler('search')}
                    />
                </div>
                <div className={`${style.items} ${words.length > 0 ? '' : style.empty}`}>
                    { searchedWords.length > 0 ? searchedWords.map((word, index) => (
                        <div key={index} className={style.item}>
                            <div className={style.national}>{word.national}:</div>
                            <div className={style.foreign}>{word.foreign}</div>
                            <div 
                                className={style.edit} 
                            />
                            <div
                                className={style.remove}
                                onClick={(e) => deleteWord(word._id, e)}
                            />
                        </div>
                    )) : words.length > 0 ? words.map((word, index) => (
                        <div key={index} className={style.item}>
                            <div className={style.national}>{word.national}:</div>
                            <div className={style.foreign}>{word.foreign}</div>
                            <div 
                                className={style.edit} 
                            />
                            <div
                                className={style.remove}
                                onClick={(e) => deleteWord(word._id, e)}
                            />
                        </div>
                    )) : 
                        <div>No more words yet!</div> 
                    }
                </div>
            </div>
            }
        </>
    )
}

export default MainPage
