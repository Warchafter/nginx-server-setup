const express = require('express');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router();


router.post('/api/todo/addTask', async (req, res) => {
    const { todo_desc } = req.body;
    const { access } = req.cookies;

    const body = JSON.stringify({
        todo_desc
    });

    console.log("body: ",body);

    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/todo/todo1/`, {
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
            error: `Something went wrong when trying to add a task`,
        });
    };
});


router.get('/api/todo/getToDoStatusList', async (req, res) => {
    const { access } = req.cookies;

    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/todo/todo-status/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`
            },
        });

        const data = await apiRes.json();

        res.status(apiRes.status).json(data);
    } catch(err) {
        return res.status(500).json({
            error: `Something went wrong when trying to get the ToDo Status List`,
        });
    };
});


// router.put('/api/todo/')
router.get('/api/todo/getToDoList', async (req, res) => {
    const { access } = req.cookies;

    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/todo/todo1/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`
            },
        });

        const data = await apiRes.json();

        res.status(apiRes.status).json(data);
    } catch(err) {
        return res.status(500).json({
            error: `Something went wrong when trying to get the ToDo List`,
        });
    };
});

module.exports = router;