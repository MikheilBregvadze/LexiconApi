import React, {useState} from 'react';
import FontAwesome from "react-fontawesome";

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
                                >
                                    <FontAwesome
                                        name="times"
                                        className="icon-md"
                                    />
                                </span>
                                {sentence.word}
                            </li>
                        ))}
                    </ul>
                }
            </div>
            <div 
                className={`${style.arrow} ${showOptions ? style.active : ''}`} 
                onClick={() => setShowOptions(!showOptions)} 
            >
                <FontAwesome
                    name="arrow-left"
                    className="icon-md"
                />
            </div>
            <div className={`${style.options} ${showOptions ? style.active : ''}`}>
                <div
                    className={`${style.addInSentences}`}
                    onClick={() => addInSentences(word._id)}
                >
                    <FontAwesome
                        name="plus"
                        className="icon-md"
                    />
                </div>
                <div
                    className={`${style.favorite}`}
                    onClick={() => addToFavorite(word._id)}
                >
                    <FontAwesome
                        name="star"
                        className={`icon-md ${word.isFavorite ? 'active' : ''}`}
                    />
                </div>
                <div
                    onClick={() => editItem(word)}
                    className={style.edit}
                >
                    <FontAwesome
                        name="wrench"
                        className={`icon-md`}
                    />
                </div>
                <div
                    className={style.remove}
                    onClick={(e) => deleteWord(word._id, e)}
                >
                    <FontAwesome
                        name="trash"
                        className={`icon-md`}
                    />
                </div>
            </div>
        </div>
    )
};

export default WordItem
