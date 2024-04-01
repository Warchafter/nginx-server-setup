const express = require('express');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router();

router.get('/api/jikanAnime/weekly', async (req, res) => {
    const {scheduleDay} = req.query;

    try {
        const apiResponse = await fetch(`https://api.jikan.moe/v4/schedules?filter=${scheduleDay}&kids=false&sfw=true&sfw&unapproved`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        const data = await apiResponse.json();

        res.status(apiResponse.status).json(data);
    } catch(err) {
        return res.status(500).json({
            error: 'Something went wrong when trying to access the data',
        });
    };
});

module.exports = router;