const express = require('express');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));


const router = express.Router();

router.put('/api/users/setDefaultTheme', async (req, res) => {
    const { access } = req.cookies;
    const {id, theme_picked} = req.body;

    const body = JSON.stringify({theme_picked});

    try {
        const apiResponse = await fetch(`${process.env.API_URL}/api/users/users/${id}/set_theme/`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`
            },
            body,
        });

        const data = await apiResponse.json();

        if (apiResponse.status === 200) {
            // Set theme_picked as a cookie
            res.cookie('theme_picked', data.theme_picked, {
                httpOnly: true,
                maxAge: 60 * 30 * 60,
                path: '/api/',
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            });

            return res.status(200).json(data);
        } else {
            return res.status(apiResponse.status).json(data);
        }
    } catch(err) {
        return res.status(500).json({
            error: 'Something went wrong when trying to set the theme picked',
        });
    };
});

module.exports = router;