import React, {useState} from 'react';

import style from './WordItem.module.css'

const WordItem = ({ word, index, deleteSentence, addInSentences, addToFavorite, editItem, deleteWord, isExchanged }) => {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div key={index} className={`${style.item} ${isExchanged ? style.isExchanged : ''}`}>
            <div className={`${style.words} ${showOptions ? style.active : ''}`}>
                <div className={style.national}>{word.national}</div>
                <div className={`${style.foreign} ${showOptions ? style.hide : ''}`}>{word.foreign}</div>
                
                {word.inSentences.length > 0 && 
                    <ul className={`${style.sentences} ${showOptions ? style.hide : ''}`}>
                        {word.inSentences.map(sentence => (
                            <li key={sentence._id}>
                                <span 
                                    title='Remove sentence' 
                                    className={style.removeSentence}
                                    onClick={() => deleteSentence(word._id, sentence._id)}
                                />
                                {sentence.word}
                            </li>
                        ))}
                    </ul>
                }
            </div>
            <div className={`${style.arrow} ${showOptions ? style.active : ''}`} onClick={() => setShowOptions(!showOptions)} />
            <div className={`${style.options} ${showOptions ? style.active : ''}`}>
                <div
                    className={`${style.addInSentences}`}
                    onClick={() => addInSentences(word._id)}
                />
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
    )
};

export default WordItem
