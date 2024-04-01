const express = require('express');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router();

router.get('/api/jikanAnime/getFavList', async (req, res) => {
    const { access } = req.cookies;

    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/jikananime/jikan-favorite-animes/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'applicaiton/json',
                Authorization: `Bearer ${access}`
            }
        });

        const data = await apiRes.json();

        res.status(apiRes.status).json(data);
    } catch (err) {
        return res.status(500).json({
            error: "An error ocurred when trying to fetch the list of favorite animes"
        });
    }
});

router.post('/api/jikanAnime/addFav', async (req, res) => {
    const { mal_id } = req.body;
    const { access } = req.cookies;

    const body = JSON.stringify({
        mal_id
    });

    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/jikananime/jikan-favorite-animes/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`
            },
            body,
        });

        const data = await apiRes.json();

        res.status(apiRes.status).json(data);
    } catch(err) {
        return res.status(500).json({
            error: `Something went wrong when trying to save anime: ${mal_id} as favorite`,
        });
    };
});

module.exports = router;