import React, { useState, useEffect } from 'react'
import FontAwesome from "react-fontawesome"
import Button from '../../../components/customButton/Button'
import Input from '../../../components/customInput/Input'
import { useClickOutside } from '../../../services/context/outsideClick'
import style from './TestingMode.module.css'

const TestingMode = ({ words, goBack }) => {
    const [localWords, setLocalWords] = useState(words);
    const [index, setindex] = useState(words);
    const [currentField, setCurrentField] = useState(null);
    const [fieldValue, setFieldValue] = useState('');
    const [error, setError] = useState(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [inCorrectCount, setInCorrectCount] = useState(0);
    const [fieldOptionIndex, setFieldOptionIndex] = useState(null);
    const array = ['foreign', 'national'];
    
    useEffect(() => {
        setFieldOptionIndex(getRandomIndex(array.length));
    }, [])

    useEffect(() => {
        const index = getRandomIndex(localWords.length);
        setindex(index);
        setCurrentField(localWords[index]);
    }, [localWords])

    const nextStep = () => {
        if(fieldValue.length === 0) {
            return setError('Field is empty');
        }
        const fieldOption = fieldOptionIndex === 1 ? array[0] : array[1];
        const alreadyExist = localWords.find(item => item[fieldOption].toLowerCase() === fieldValue.toLowerCase());
        if(alreadyExist) setCorrectCount(correctCount+1)
        else setInCorrectCount(inCorrectCount+1)
        const _words = [...localWords];
        setCurrentField(_words[index]);
        _words.splice(index, 1);
        setLocalWords(_words);
        setFieldValue('');
    }

    const retry = () => {
        setFieldOptionIndex(getRandomIndex(array.length));
        setInCorrectCount(0);
        setCorrectCount(0);
        setLocalWords(words);
    }

    const getRandomIndex = (max) => { return Math.floor(Math.random() * max) }

    const domNode = useClickOutside(() => { setError(null) })
    
    return (
        <div className={`${style.row}`}>
            <h2>Exercise:
                <span className={style.goHome} onClick={() => goBack()}>
                    <FontAwesome
                        name="home"
                        className={`icon-xl`}
                    />
                </span>
            </h2>
            {currentField && <h4>Add a answer to the paragraph below with the text "{currentField[array[fieldOptionIndex]]}". </h4>}
            {localWords.length > 0 ?
                <div>
                    <div className={style.formGroup} ref={domNode}>
                        <label htmlFor="foreign" />
                        <Input
                            placeholder="Type here"
                            name="foreign"
                            value={fieldValue}
                            onChangeHandler={(e) => setFieldValue(e.target.value)}
                        />
                        {error && <span className={style.error}>{error}</span>}
                    </div>
                    <Button title="Next" type="button" clickHandler={() => nextStep(true)} />
                </div> 
                : 
                <div className={style.finised} onClick={retry}>
                    <span className={style.retry}>
                        Try again
                    </span>
                        <FontAwesome
                            name="undo"
                            className={`icon-xl`}
                        />
                </div>
            }
            <div className={style.result}>
                {localWords.length > 0 && <p>Left: {localWords.length}</p>}
                <p>Correct: {correctCount}</p>
                <p>Incorrect: {inCorrectCount}</p>
            </div>
        </div>
    )
}

export default TestingMode