import React, { useState, useEffect, useContext } from 'react'
import Input from '../../components/customInput/Input'
import Button from '../../components/customButton/Button'
import EditItem from './EditItem/EditItem'
import {
    ClientAddWord,
    GetClientAllWords,
    DeleteWordById,
    AddFavorite,
    GetFavoriteWords
} from '../../services/services'
// import Notifications from "./Notifications/Notifications";
import { Auth } from '../../services/context/useAuthentication'

import style from './MainPage.module.css'
import Favorites from './Favorites/Favorites'
import ModalView from './ModalView/ModalView'

function MainPage() {
    const [form, setForm] = useState({
        national: '',
        foreign: ''
    })
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [words, setWords] = useState([]);
    const [favoriteWords, setFavoriteWords] = useState([]);
    const [updateWord, setUpdateWord] = useState(0);
    const [searchedWords, setSearchedWords] = useState([]);
    // const [callNotification, setCallNotification] = useState(false);    
    const [showModalView, setShowModalView] = useState(false);
    const { auth } = useContext(Auth);
    
    const onChangeHandler = (input) => (event) => {
        setErrorMessage(null);
        setForm({ ...form, [input]: event.target.value });
        setErrors({...errors, [input]: null });
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
        // setCallNotification(false);
        e.preventDefault();
        ClientAddWord(form)
            .then(res => {
                if(res.status === 201) {
                    setWords(res.data.words);
                    setForm({ national: '', foreign: '' });
                    setTimeout(() => {
                        // setCallNotification(true);
                    }, 3000)
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

    const deleteWord = (id) => {
        DeleteWordById(id)
            .then(res => {
                if(res.status === 201) {
                    getFavorites();
                    setWords(res.data.words);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const editItem = (item) => {
        setUpdateWord(item);
    }

    const addToFavorite = (id) => {
        AddFavorite(id)
            .then(res => {
                if(res.status === 201) {
                    setWords(res.data.words);
                    setFavoriteWords(res.data.favoriteWords);
                }
            })
            .catch( error=> {
                console.log(error);
            })
    }

    useEffect(() => {
        if(!auth) return;
        GetClientAllWords()
            .then(res => {
                if(res.status === 201) {
                    setWords(res.data.words);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }, [auth])

    useEffect(() => {
        if(!auth) return;
        getFavorites();
    }, [auth])

    const getFavorites = () => {
        GetFavoriteWords()
            .then(res => {
                if(res.status === 201) {
                    setFavoriteWords(res.data.favoriteWords);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    const updateFavorite = (id, favoriteWords) => {
        const newArr = words;
        newArr.map(item => item._id === id ? item.isFavorite = false : false);
        setWords(newArr);
        setFavoriteWords(favoriteWords);
    }
    
    return (
        <>
            {auth && 
                <div className={style.main}>
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
                    <div className={style.formGroup + ' ' + style.search}>
                        <label htmlFor="search" />
                        <Input
                            placeholder="Search"
                            name="search"
                            value={search}
                            onChangeHandler={onChangeHandler('search')}
                        />
                    </div>
                    <div className={style.row}>
                        <div>   
                            <div className={style.rowHeader}>
                                <h1>Words / Count: {words.length}</h1>
                                {words.length > 0 &&
                                    <div 
                                        className={style.fullScreen} 
                                        onClick={() => setShowModalView(true)}    
                                    />
                                }
                            </div>
                            <div className={`${style.items} ${words.length > 0 ? '' : style.empty}`}>
                                { searchedWords.length > 0 ? searchedWords.map((word, index) => (
                                    <div key={index} className={style.item}>
                                        <div className={style.national}>{word.national}:</div>
                                        <div className={style.foreign}>{word.foreign}</div>
                                        <div className={style.options}>
                                            <div
                                                className={`${style.favorite} ${word.isFavorite ? style.activeFavorite : ''}`}
                                                onClick={() => addToFavorite(word._id)}
                                            />
                                            <div
                                                onClick={() => editItem(word)}
                                                className={style.edit}
                                            />
                                            <div
                                                className={style.remove}
                                                onClick={(e) => deleteWord(word._id, e)}
                                            />
                                        </div>
                                    </div>
                                )) : words.length > 0 ? words.map((word, index) => (
                                    <div key={index} className={style.item}>
                                        <div className={style.national}>{word.national}:</div>
                                        <div className={style.foreign}>{word.foreign}</div>
                                        <div className={style.options}>
                                            <div
                                                className={`${style.favorite} ${word.isFavorite ? style.activeFavorite : ''}`}
                                                onClick={() => addToFavorite(word._id)}
                                            />
                                            <div
                                                onClick={() => editItem(word)}
                                                className={style.edit}
                                            />
                                            <div
                                                className={style.remove}
                                                onClick={(e) => deleteWord(word._id, e)}
                                            />
                                        </div>
                                    </div>
                                )) : 
                                    <div>No more words yet!</div> 
                                }
                            </div>
                        </div>
                        <Favorites favoriteWords={favoriteWords} updateFavorite={updateFavorite} />
                    </div>
                </div>
            }
            {words.length > 0 && 
                <ModalView 
                    words={words} 
                    modalIsOpen={showModalView} 
                    closeModal={() => setShowModalView(!showModalView)} 
                />
            }
            <EditItem 
                modalIsOpen={updateWord !== 0} 
                item={updateWord} 
                closeModal={() => setUpdateWord(0)} 
                updateWords={(words, favoriteWords) => {setWords(words); setFavoriteWords(favoriteWords); setUpdateWord(0)}} 
            />
            {/* <Notifications callNotification={callNotification} /> */}
        </>
    )
}

export default MainPage
