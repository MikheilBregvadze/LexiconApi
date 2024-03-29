const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { type } = require('express/lib/response');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    words: [
        {
            isFavorite: { type: Boolean, required: true },
            national: { type: String, required: true },
            foreign: { type: String, required: true },
            inSentences: [
                { 
                    word: { type: String } 
                }
            ]
        }
    ],
    favoriteWords: [
        {
            national: { type: String, required: true },
            foreign: { type: String, required: true }
        }
    ],
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
