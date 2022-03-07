import React, { useState, useEffect, useContext } from 'react'
import FontAwesome from "react-fontawesome"
import EditItem from './EditItem/EditItem'
import {
    GetClientAllWords,
    DeleteWordById,
    AddFavorite,
    GetFavoriteWords,
    DeleteSentence
} from '../../services/services'
import { Auth } from '../../services/context/useAuthentication'
import { Theme } from '../../services/context/themeContext'
import Favorites from './Favorites/Favorites'
import ModalView from './ModalView/ModalView'
import AddSentences from './AddSentences/AddSentences'
import TestingMode from './TestingMode/TestingMode'
import  WordItem  from './WordItem/WordItem'
import AddWord from './AddWord/AddWord'
import Landing from '../landing/Landing'

import style from './MainPage.module.css'
import Search from './Search/Search'
import { Loader } from '../../components/loader/Loader'

function MainPage() {
    const [words, setWords] = useState([]);
    const [favoriteWords, setFavoriteWords] = useState([]);
    const [updateWord, setUpdateWord] = useState(0);
    const [searchedWords, setSearchedWords] = useState([]);
    const [isExchanged, setIsExchanged] = useState(false); 
    const [showModalView, setShowModalView] = useState(false);
    const [showSentences, setShowSentences] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [testingMode, setTestingMode] = useState(false);
    const { auth } = useContext(Auth);
    const { theme } = useContext(Theme);

    const deleteWord = (id) => {
        setShowLoader(true);
        DeleteWordById(id)
            .then(res => {
                setShowLoader(false);
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
        setShowLoader(true);
        AddFavorite(id)
            .then(res => {
                setShowLoader(false);
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
        setShowLoader(false);
    }

    const addInSentences = (id) => {
        setShowSentences(id)
    }

    const deleteSentence = (wordId, sentenceId) => {
        setShowLoader(true);
        DeleteSentence(wordId, sentenceId)
            .then(res => {
                setShowLoader(false);
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
            {theme.allowLandingPage && <Landing />}
            {auth && 
                <div className={`${style.main} ${testingMode ? style.testingMode : ''}`}>
                    {showLoader && <Loader />}
                    <AddWord 
                        setWords={words => setWords(words)} 
                        toggleLoader={() => setShowLoader(!showLoader)}     
                    />
                    <Search 
                        words={words}
                        setSearchedWords={words => setSearchedWords(words)}
                    />
                    <div className={style.row}>
                        <div className={style.wordSection}>   
                            <div className={style.rowHeader}>
                                <h1>Words / Count: {words.length}</h1>
                                {words.length > 0 && <div className={style.wordsMenu}>
                                    <div 
                                        className={style.exchange} 
                                        onClick={() => setTestingMode(!testingMode)}  
                                    >
                                        <FontAwesome
                                            name="file"
                                            className={`icon-xl`}
                                        />
                                    </div>
                                    <div 
                                        className={style.exchange} 
                                        onClick={() => setIsExchanged(!isExchanged)}  
                                    >
                                        <FontAwesome
                                            name="retweet"
                                            className={`icon-xl`}
                                        />
                                    </div>
                                    <div 
                                        className={style.fullScreen} 
                                        onClick={() => setShowModalView(true)}    
                                    >
                                        <FontAwesome
                                            name="arrows-alt"
                                            className={`icon-xl`}
                                        />
                                    </div>
                                    
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
                                )) : words.length > 0 ? [...words].reverse().map((word, index) => (
                                    <WordItem 
                                        key={index}
                                        word={word}
                                        index={index}
                                        isExchanged={isExchanged}
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
                        <div className={style.favorites}>
                            <Favorites 
                                favoriteWords={favoriteWords} 
                                updateFavorite={updateFavorite} 
                                toggleLoader={() => setShowLoader(!showLoader)} 
                            />
                        </div>
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
            { testingMode &&  
                <TestingMode 
                    words={words} 
                    goBack={() => setTestingMode(false)}
                />
            }
            <EditItem 
                modalIsOpen={updateWord !== 0} 
                item={updateWord} 
                closeModal={() => setUpdateWord(0)} 
                toggleLoader={() => setShowLoader(!showLoader)} 
                updateWords={(words, favoriteWords) => {setWords(words); setFavoriteWords(favoriteWords); setUpdateWord(0)}} 
            />
            <AddSentences 
                toggleLoader={() => setShowLoader(!showLoader)} 
                modalIsOpen={showSentences ? true : false} 
                itemId={showSentences}
                closeModal={() => setShowSentences(null)} 
                updateWords={(words => setWords(words))}
            />
        </>
    )
}

export default MainPage
