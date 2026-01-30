const axios = require('axios'); // HTTP client

// === Learner API ===
const LEARNER_API_KEY = process.env.LEARN_MW_API_KEY;
const LEARNER_API_URL = 'https://www.dictionaryapi.com/api/v3/references/learners/json';

// Callss the learner api
const learnerDictionaryWord = async (word) => {
    const response = await axios.get (`${LEARNER_API_URL}/${word}`,{
        params: {key: LEARNER_API_KEY}
    });
    return response.data;
};

// === Elementary API ===
const ELEM_API_KEY = process.env.ELEM_MW_API_KEY;
const ELEM_API_URL = 'https://www.dictionaryapi.com/api/v3/references/sd2/json';


const elementaryDictionaryWord = async (word) => {
    const response = await axios.get (`${ELEM_API_URL}/${word}`,{
        params: {key: ELEM_API_KEY}
    });
    return response.data;
};

// Exports 
module.exports = {
    learnerDictionaryWord, elementaryDictionaryWord
};
