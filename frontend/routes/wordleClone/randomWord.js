const express = require('express');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router();

router.get('/api/wordleClone/words/', async (req, res) => {
    const rapidAPIKey = process.env.X_RAPIDAPI_KEY;
    const rapidAPIHost = process.env.X_RAPIDAPI_HOST;
    try {
        const apiResponse = await fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=5&lettersMax=5', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'X-RapidAPI-Key': rapidAPIKey,
                'X-RapidAPI-Host': rapidAPIHost
            }
        });
        const data = await apiResponse.json();

        res.status(apiResponse.status).json(data);
    } catch(err) {
        return res.status(500).json({
            error: 'Something went wrong when trying to get the random word',
        });
    };
});

module.exports = router;