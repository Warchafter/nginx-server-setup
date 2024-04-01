const express = require('express');
// const cookie = require('cookie');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));


const router = express.Router();

router.post('/api/users/refresh', async (req, res) => {
    const { refresh } = req.cookies;

    console.log("reached the beginning of the Express js route.");

    const body = JSON.stringify({
        refresh: refresh
    });

    console.log("body: ", body);

    try {
        const apiResponse = await fetch(`${process.env.API_URL}/api/auth/jwt/refresh/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body,
        });

        if (!apiResponse.ok) {
            throw new Error(`Failed to refresh access token. Status: ${apiResponse.status}`);
        }

        const data = await apiResponse.json();

        res.setHeader('Set-Cookie', [
            cookie.serialize('access', data.access, {
                httpOnly: true,
                maxAge: 60 * 30,
                path: '/api/',
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            })
        ]);

        return res.status(200).json({ success: 'Access token has been successfully refreshed'});
    } catch (err) {
        console.error("Error refreshing access token:", err);

        if (err.name === 'FetchError') {
            // Network error occurred
            return res.status(500).json({
                error: 'A network error occurred while trying to refresh the access token',
            });
        } else if (err instanceof SyntaxError) {
            // Response body parsing error
            return res.status(500).json({
                error: 'Failed to parse the response from the server',
            });
        } else {
            // Other unexpected errors
            return res.status(500).json({
                error: 'Something went wrong when trying to refresh the access token',
            });
        }
    }
});

module.exports = router;