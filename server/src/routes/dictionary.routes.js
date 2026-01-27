const express = require('express');

const router = express.Router();

const {
    learnerDictionaryWord,
    elementaryDictionaryWord
} = require('../services/dictionary.service');


// === Learning dictionary === 
// :word used to create a synaamic route
router.get('/dictionary/:word', async (req, res) => {
    try {
        const {word} = req.params;
        const data = await learnerDictionaryWord(word); // Calls the learner dictionary API
        res.json(data); 
    } catch (err) {
        res.status(500).json ({ error: 'Dictionary API failed'});
    }
});

// === Elementary dictionary ===
router.get('/dictionary/elementary/:word', async (req, res) => {
    try {
        const {word} = req.params;
        const data = await elementaryDictionaryWord(word);
        res.json(data); 
    } catch (err) {
        res.status(500).json ({ error: 'Elementary API failed'});
    }
});


module.exports = router;