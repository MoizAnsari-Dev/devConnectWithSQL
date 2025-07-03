import express from 'express';
import { pool } from '../database.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, password} = req.body;
    if (!name) return res.send('Name can not be empty');
    if (!email) return res.send('Email can not be empty');
    if (!password) return res.send('Password can not be empty');
    
    const results = await pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, 
        [name, email, password]
    );
    res.json(results.rows[0]);
});

//Reading all DATA

router.get('/', async (req, res) => {
    const result = await pool.query(`SELECT * FROM users`);
    res.json(result.rows);
});


export {
    router
}