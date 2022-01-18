const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware.js');
const {
    authUser,
    addWord,
    editWord,
    deleteWord,
    getAllWords,
    registerUser,
    getFavoriteWords,
    addWordToFavorites,
    deleteFavoriteWord
} = require('../controllers/userControllers');


router.post('/Login', authUser);
router.post('/Register', registerUser);
router.route('/AddWord').post(protect, addWord);
// router.route('/GetAllWords').get(protect, getAllWords);
router.get('/GetAllWords', getAllWords);
router.route('/EditWord/:item_id').put(protect, editWord);
router.route('/DeleteWord/:item_id').delete(protect, deleteWord);
router.route('/GetFavoriteWords').get(protect, getFavoriteWords);
router.route('/AddFavorite/:item_id').post(protect, addWordToFavorites);
router.route('/DeleteFavoriteWord/:item_id').delete(protect, deleteFavoriteWord);

module.exports = router;