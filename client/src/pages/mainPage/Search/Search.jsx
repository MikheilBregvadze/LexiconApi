import React, { useState } from 'react';
import Input from '../../../components/customInput/Input';

import style from './Search.module.css';

const Search = ({ words, setSearchedWords }) => {
    const [search, setSearch] = useState('');

    const onChangeHandler = (input) => (event) => {
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
    return (
        <div className={style.search}>
            <label htmlFor="search" />
            <Input
                placeholder="Search"
                name="search"
                value={search}
                onChangeHandler={onChangeHandler('search')}
            />
        </div>
    );
};

export default Search;
