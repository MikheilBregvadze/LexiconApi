import React, { useState, useEffect } from 'react';
import { DeleteFavoriteWordById } from '../../../services/services';
import FontAwesome from "react-fontawesome";

import style from './Favorites.module.css';

function Favorites(props) {
    const [favoriteWords, setFavoriteWords] = useState(props.favoriteWords || []);
    useEffect(() => {
        setFavoriteWords(props.favoriteWords)
    }, [props])
    const deleteFavoriteWord = (id) => {
        DeleteFavoriteWordById(id)
            .then(res => {
                setFavoriteWords(res.data.favoriteWords);
                props.updateFavorite(id, res.data.favoriteWords);
            })
    }
    return (
        <div className={style.container}>
            <h1>Favorites / Count: {favoriteWords.length}</h1>
            <div className={`${style.items} ${favoriteWords.length > 0 ? '' : style.empty}`}>
            {
                favoriteWords.length > 0 ? favoriteWords.map((word, index) => (
                    <div key={index} className={style.item}>
                        <div className={style.national}>{word.national}:</div>
                        <div className={style.foreign}>{word.foreign}</div>
                        <div className={style.options}>
                            <div
                                className={style.remove}
                                onClick={(e) => {deleteFavoriteWord(word._id, e); props.toggleLoader()}}
                            >
                            <FontAwesome
                                name="trash"
                                className={`icon-md`}
                            />
                        </div>
                        </div>
                    </div>
                )) : <div>No favorite words yet!</div>
            }
            </div>
        </div>
    )
}

export default Favorites
