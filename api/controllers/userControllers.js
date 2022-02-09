const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const jwt_decode = require('jwt-decode');
const User = require('../models/userModel');

const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const errors = {};
    if(username.length === 0) {
        errors['username'] = 'Field is empty!';
    }

    if(password.length === 0) {
        errors['password'] = 'Field is empty!';
    }   

    if(Object.entries(errors).length > 0) {
        res.json({ status: 400, error: errors });
        throw new Error('Validation error!');
    }

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id),
        })
    }else {
        res.status(401).json({ error: 'Invalid email or password' })
        throw new Error('Invalid email or password')
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, confirm_password } = req.body;

    const errors = {};
    if(username.length === 0) {
        errors['username'] = 'Field is empty!';
    }

    if(password.length === 0) {
        errors['password'] = 'Field is empty!';
    }   

    if(confirm_password.length === 0) {
        errors['confirm_password'] = 'Field is empty!';
    }   

    if(password !== confirm_password) {
        errors['password'] = "Password don't match! !";
    }

    if(Object.entries(errors).length > 0) {
        res.json({ status: 400, error: errors });
        throw new Error('Validation error!');
    }

    const usernameExists = await User.findOne({ username });
    
    if (usernameExists) {
        res.json({ status: 400, errorMessage: 'Username already taken' });
        throw new Error('Username already taken');
    } 

    const user = await User.create({
        username,
        words: [],
        favoriteWords: [],
        password,
    });

    if(user) {
        res.json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id)
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

const addWord = asyncHandler(async (req, res) => {
    const { national, foreign } = req.body;
    const user = await User.findById(getUserId(req.headers.authorization));
    const words = user.words;
    const alreadyExist = words.find((r) => r.foreign.toLowerCase() === foreign.toLowerCase());
    const errors = {};
    if(national.length === 0) {
        errors['national'] = 'Field is empty!';
    }

    if(foreign.length === 0) {
        errors['foreign'] = 'Field is empty!';
    }   

    if(Object.entries(errors).length > 0) {
        res.json({ status: 400, errors: errors });
        throw new Error('Word already exist');
    }

    if (alreadyExist) {
        res.json({ status: 400, errorMessage: 'Word already exist' });
        throw new Error('Word already exist');
    } 

    const newWordList = {
        isFavorite: false,
        national,
        foreign
    }

    words.push(newWordList);
    await user.save();
    res.status(201).json({ words: user.words });
})

const getAllWords = asyncHandler(async (req, res) => {
    const user = await User.findById(getUserId(req.headers.authorization));
    if(user) {  
        res.status(201).json({ words: user.words });
    } else {
        res.status(404).json({ errorMessage: 'Word not exist' });
    }
})

const deleteWord = asyncHandler(async (req, res) => {
    const user = await User.findById(getUserId(req.headers.authorization));
    const alreadyExist = user.words.find((r) => r._id.toString() === req.params.item_id.toString());
    if (alreadyExist || favoriteWordsAlreadyExist) {
        const words = user.words.filter((r) => r._id.toString() !== req.params.item_id.toString());
        
        const favoriteWordsAlreadyExist = user.favoriteWords.find((r) => r._id.toString() === req.params.item_id.toString());
        if(favoriteWordsAlreadyExist) {
            const favoriteWords = user.favoriteWords.filter((r) => r._id.toString() !== req.params.item_id.toString());
            user.favoriteWords = favoriteWords;
        }
        user.words = words;
        await user.save();
        res.status(201).json({ words: words });
    } else {
        res.status(404).json({ errorMessage: 'Word not exist' });
    }
})

const editWord = asyncHandler(async (req, res) => {
    const { national, foreign } = req.body;

    const user = await User.findById(getUserId(req.headers.authorization));
    const words = user.words;
    const favoriteWords = user.favoriteWords;
    const currentWord = words.find((r) => r._id.toString() === req.params.item_id.toString());
    const currentFavoriteWord = favoriteWords.find((r) => r._id.toString() === req.params.item_id.toString());
    
    const errors = {};
    if(national.length === 0) {
        errors['national'] = 'Field is empty!';
    }

    if(foreign.length === 0) {
        errors['foreign'] = 'Field is empty!';
    }   

    if(Object.entries(errors).length > 0) {
        res.json({ status: 400, errors: errors });
        throw new Error('Word already exist');
    }


    if (currentWord) {
        currentWord.national = national;
        currentWord.foreign = foreign;
        if(currentFavoriteWord) {
            currentFavoriteWord.national = national;
            currentFavoriteWord.foreign = foreign;
        }
        // user.words = currentWord;
        await user.save();
        res.status(201).json({ words: user.words, favoriteWords: user.favoriteWords });
    } else {
        res.status(404).json({ errorMessage: 'Word already exist' });
    }
})

const addWordToFavorites = asyncHandler(async (req, res) => {
    const user = await User.findById(getUserId(req.headers.authorization));
    const currentWord = user.words.find((r) => r._id.toString() === req.params.item_id.toString());
    const alreadyExist = user.favoriteWords.find((r) => r._id.toString() === req.params.item_id.toString());
    currentWord.isFavorite = !alreadyExist;
    if(!alreadyExist)
        user.favoriteWords.push(currentWord);
    else {
        const favoriteWords = user.favoriteWords.filter((r) => r._id.toString() !== req.params.item_id.toString());
        user.favoriteWords = favoriteWords;
    }
    await user.save();
    res.status(201).json({ favoriteWords: user.favoriteWords, words: user.words });
})

const getFavoriteWords = asyncHandler(async (req, res) => {
    const user = await User.findById(getUserId(req.headers.authorization));
    if(user) {
        res.status(201).json({ favoriteWords: user.favoriteWords });
    } else {
        res.status(404).json({ errorMessage: 'Favorite Words not exist' });
    }
})

const deleteFavoriteWord = asyncHandler(async (req, res) => {
    const user = await User.findById(getUserId(req.headers.authorization));
    const currentWord = user.words.find((r) => r._id.toString() === req.params.item_id.toString());
    const alreadyExist = user.favoriteWords.find((r) => r._id.toString() === req.params.item_id.toString());
    if (alreadyExist ) {
        currentWord.isFavorite = false;
        const favoriteWords = user.favoriteWords.filter((r) => r._id.toString() !== req.params.item_id.toString());
        user.favoriteWords = favoriteWords;
        await user.save();
        res.status(201).json({ favoriteWords: favoriteWords });
    } else {
        res.status(404).json({ errorMessage: 'Word not exist' });
    }
})

const addSentences = asyncHandler(async (req, res) => {
    const { sentences } = req.body;
    const user = await User.findById(getUserId(req.headers.authorization));
    const currentWord = user.words.find((r) => r._id.toString() === req.params.item_id.toString());

    const errors = {};
    if(sentences.length === 0) {
        errors['foreign'] = 'Field is empty!';
    } 

    if(Object.entries(errors).length > 0) {
        res.json({ status: 400, errors: errors });
        throw new Error('Word already exist');
    }
    
    if(currentWord) {
        if(sentences.length > 0) {
            currentWord.inSentences.push({word: sentences});
            await user.save();
            res.status(201).json({ words: user.words });
        } else {
            res.json({ status: 400, errorMessage: 'Field is empty!' });
            throw new Error('Field is empty!');
        }
    }
})

const deleteSentences = asyncHandler(async (req, res) => {
    const sentencesId  = req.params.sentencesId;
    const user = await User.findById(getUserId(req.headers.authorization));
    const currentWord = user.words.find((r) => r._id.toString() === req.params.item_id.toString());
    
    if(currentWord) {
        if(currentWord.inSentences.length > 0) {
            const filteredSentences = currentWord.inSentences.filter((r) => r._id.toString() !== sentencesId.toString());
            if(filteredSentences.length !== currentWord.inSentences.length) {
                currentWord.inSentences = filteredSentences;
                await user.save();
                res.status(201).json({ words: user.words });
            } else {
                res.json({ status: 404, errorMessage: 'Sentences not found!' });
                throw new Error('Sentences not found!');
            }
        } else {
            res.json({ status: 400, errorMessage: 'Sentences is empty!' });
            throw new Error('Sentences is empty!');
        }
    }
})


module.exports = {
    authUser,
    addWord,
    editWord,
    deleteWord,
    getAllWords,
    registerUser,
    addSentences,
    deleteSentences,
    getFavoriteWords,
    addWordToFavorites,
    deleteFavoriteWord
};

function getUserId(token) {
    const authHeader = token;
    const _token = authHeader.split(' ')[1];
    var decoded = jwt_decode(_token);
    return decoded.id
}