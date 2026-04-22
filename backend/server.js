const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// TASK 5 - DB Config
const dbConfig = {
    user: 'sa',
    password: '12345678',   
    server: 'localhost',
    database: 'RozgarDB',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// LOGIN endpoint - calls sp_LoginUser
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('Email', sql.VarChar, email)
            .input('Password', sql.VarChar, password)
            .execute('sp_LoginUser');
        if (result.recordset.length > 0) {
            res.json({ success: true, user: result.recordset[0] });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).send('Database Error: ' + err.message);
    }
});

// GET experience - calls sp_GetExperience
app.get('/api/getExp', async (req, res) => {
    const { userID } = req.query;
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('UserID', sql.Int, userID)
            .execute('sp_GetExperience');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Database Error: ' + err.message);
    }
});

// ADD experience - calls sp_AddExperience
app.post('/api/addExp', async (req, res) => {
    const { UserID, JobTitle, CompanyName, YearsWorked } = req.body;
    try {
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('UserID', sql.Int, UserID)
            .input('JobTitle', sql.VarChar, JobTitle)
            .input('CompanyName', sql.VarChar, CompanyName)
            .input('YearsWorked', sql.Int, YearsWorked)
            .execute('sp_AddExperience');
        res.json({ message: 'Experience added successfully' });
    } catch (err) {
        res.status(500).send('Database Error: ' + err.message);
    }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
