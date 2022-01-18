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
import Notifications from "./Notifications/Notifications";
import { Auth } from '../../services/context/useAuthentication'

import style from './MainPage.module.css'
import Favorites from './Favorites/Favorites'

function MainPage() {
    const [form, setForm] = useState({
        national: '',
        foreign: ''
    })
    const [search, setSearch] = useState('');
    const [words, setWords] = useState([]);
    const [favoriteWords, setFavoriteWords] = useState([]);
    const [updateWord, setUpdateWord] = useState(0);
    const [searchedWords, setSearchedWords] = useState([]);
    const [callNotification, setCallNotification] = useState(false);
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
        setCallNotification(false);
        e.preventDefault();
        ClientAddWord(form)
            .then(res => {
                if(res.status === 201) {
                    setWords(res.data.words);
                    setForm({ national: '', foreign: '' });
                    setTimeout(() => {
                        setCallNotification(true);
                    }, 3000)
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
        setUpdateWord(item)
    }

    const addToFavorite = (id) => {
        const newArr = words;
        newArr.map(item => item._id === id ? item.isFavorite = true : false)
        setWords(newArr);
        AddFavorite(id)
            .then(res => {
                if(res.status === 201) {
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
                        <h1>Words</h1>
                        <div className={`${style.items} ${words.length > 0 ? '' : style.empty}`}>
                            { searchedWords.length > 0 ? searchedWords.map((word, index) => (
                                <div key={index} className={style.item}>
                                    <div className={style.national}>{word.national}:</div>
                                    <div className={style.foreign}>{word.foreign}</div>
                                    <div className={style.options}>
                                        {!word.isFavorite &&
                                        <div
                                            className={style.favorite}
                                            onClick={() => addToFavorite(word._id)}
                                        />
                                        }
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
                                        {!word.isFavorite &&
                                        <div
                                            className={style.favorite}
                                            onClick={() => addToFavorite(word._id)}
                                        />
                                        }
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
            <EditItem modalIsOpen={updateWord !== 0} item={updateWord} closeModal={() => setUpdateWord(0)} updateWords={(words) => {setWords(words); setUpdateWord(0)}} />
            <Notifications callNotification={callNotification} />
        </>
    )
}

export default MainPage
