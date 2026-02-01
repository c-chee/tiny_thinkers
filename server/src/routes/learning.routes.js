const express = require('express');

const router = express.Router();

const { learnerDictionaryWord } = require('../services/learning.service');

//learning dictionary
router.get('/dictionary/:word', async (req, res) => {
    try {
        const {word} = req.params;
        const data = await learnerDictionaryWord(word);
        res.json(data); 
    } catch (err) {
        res.status(500).json ({ error: 'Dictionary API failed'});
    }
});

//elementary dictionary
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