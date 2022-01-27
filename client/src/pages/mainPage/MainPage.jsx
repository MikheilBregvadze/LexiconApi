import React, { useState, useEffect, useContext } from 'react'
import EditItem from './EditItem/EditItem'
import {
    GetClientAllWords,
    DeleteWordById,
    AddFavorite,
    GetFavoriteWords,
    DeleteSentence
} from '../../services/services'
import { Auth } from '../../services/context/useAuthentication'
import Favorites from './Favorites/Favorites'
import ModalView from './ModalView/ModalView'
import AddSentences from './AddSentences/AddSentences'
import  WordItem  from './WordItem/WordItem'
import AddWord from './AddWord/AddWord'

import style from './MainPage.module.css'
import Search from './Search/Search'

function MainPage() {
    const [words, setWords] = useState([]);
    const [favoriteWords, setFavoriteWords] = useState([]);
    const [updateWord, setUpdateWord] = useState(0);
    const [searchedWords, setSearchedWords] = useState([]);
    const [isExchanged, setIsExchanged] = useState(false); 
    const [showModalView, setShowModalView] = useState(false);
    const [showSentences, setShowSentences] = useState(null);
    const { auth } = useContext(Auth);
    
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
                    <AddWord setWords={words => setWords(words)} />
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
                        <Favorites 
                            favoriteWords={favoriteWords} 
                            updateFavorite={updateFavorite} 
                        />
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
        </>
    )
}

export default MainPage
