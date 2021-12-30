const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const jwt_decode = require('jwt-decode');
const User = require('../models/userModel');

const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id),
        })
    }else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const usernameExists = await User.findOne({ username });
    
    if (usernameExists) {
        res.json({ status: 400, errorMessage: 'Username already taken' });
        throw new Error('Username already taken');
    } 

    const user = await User.create({
        username,
        words: [],
        password,
    });

    if(user) {
        res.json({
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

    if (alreadyExist) {
        res.json({ status: 400, errorMessage: 'Word already exist' });
        throw new Error('Word already exist');
    } 

    const newWordList = {
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
    if (alreadyExist) {
        const words = user.words.filter((r) => r._id.toString() !== req.params.item_id.toString());
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
    const currentWord = words.find((r) => r._id.toString() === req.params.item_id.toString());
    
    if (currentWord) {
        currentWord.national = national;
        currentWord.foreign = foreign;
        // user.words = currentWord;
        await user.save();
        res.status(201).json({ words: user.words });
    } else {
        res.status(404).json({ errorMessage: 'Word already exist' });
    }
})


module.exports = {
    authUser,
    addWord,
    editWord,
    deleteWord,
    getAllWords,
    registerUser
};

function getUserId(token) {
    const authHeader = token;
    const _token = authHeader.split(' ')[1];
    var decoded = jwt_decode(_token);
    return decoded.id
}