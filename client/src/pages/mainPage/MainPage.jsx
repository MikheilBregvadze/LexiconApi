import React, { useState, useEffect, useContext } from 'react'
import Input from '../../components/customInput/Input'
import Button from '../../components/customButton/Button'
import EditItem from './EditItem/EditItem'
import {
    ClientAddWord,
    GetClientAllWords,
    DeleteWordById,
    AddFavorite,
    GetFavoriteWords,
    DeleteSentence
} from '../../services/services'
// import Notifications from "./Notifications/Notifications";
import { Auth } from '../../services/context/useAuthentication'
import Favorites from './Favorites/Favorites'
import ModalView from './ModalView/ModalView'
import AddSentences from './AddSentences/AddSentences'
import  WordItem  from './WordItem/WordItem'
import style from './MainPage.module.css'

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
    const [isExchanged, setIsExchanged] = useState(false);
    // const [callNotification, setCallNotification] = useState(false);    
    const [showModalView, setShowModalView] = useState(false);
    const [showSentences, setShowSentences] = useState(null);
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

    const addInSentences = (id) => {
        setShowSentences(id)
    }

    const deleteSentence = (wordId, sentenceId) => {
        DeleteSentence(wordId, sentenceId)
            .then(res => {
                if(res.status === 201) {
                    setWords(res.data.words);  
                }
            })
            .catch(error => {
                console.log(error);
            })
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
                        <div className={style.wordSection}>   
                            <div className={style.rowHeader}>
                                <h1>Words / Count: {words.length}</h1>
                                {words.length > 0 && <div className={style.wordsMenu}>
                                    <div 
                                        className={style.exchange} 
                                        onClick={() => setIsExchanged(!isExchanged)}  
                                    />
                                    <div 
                                        className={style.fullScreen} 
                                        onClick={() => setShowModalView(true)}    
                                    />
                                    
                                </div>}
                            </div>
                            <div className={`${style.items} ${words.length > 0 ? '' : style.empty} ${isExchanged ? style.isExchanged : ''}`}>
                                { searchedWords.length > 0 ? searchedWords.map((word, index) => (
                                    <WordItem 
                                        key={index}
                                        word={word}
                                        index={index}
                                        editItem={editItem}
                                        deleteWord={deleteWord}
                                        addToFavorite={addToFavorite}
                                        addInSentences={addInSentences}
                                        deleteSentence={deleteSentence}
                                    />
                                )) : words.length > 0 ? words.map((word, index) => (
                                    <WordItem 
                                        key={index}
                                        word={word}
                                        index={index}
                                        editItem={editItem}
                                        deleteWord={deleteWord}
                                        addToFavorite={addToFavorite}
                                        addInSentences={addInSentences}
                                        deleteSentence={deleteSentence}
                                    />
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
                    isExchanged={isExchanged}
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
            <AddSentences 
                modalIsOpen={showSentences ? true : false} 
                itemId={showSentences}
                closeModal={() => setShowSentences(null)} 
                updateWords={(words => setWords(words))}
            />
            {/* <Notifications callNotification={callNotification} /> */}
        </>
    )
}

export default MainPage
