const express = require('express');
const { param } = require('express/lib/request');
const { json } = require('express/lib/response');
const res = require('express/lib/response');
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');
const PORT = process.env.PORT || 3001;
const app = express();

//EXPRESS MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to the database
const db = mysql.createConnection({
    host: 'localhost',
    //my MySQL username
    user: 'root',
    //my MySQL password
    password: 'Invincible3162!',
    database: 'election'
},
    console.log('Connected to the election database.')
);

// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

//search for a specific candidate
app.get('/api/candidates/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.json({
            message: "Success",
            data: row
        });
    });
});

//delete a candidate based on there id
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id =?`;
    const params = [req.params.id];


    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ err: res.message });
        }
        //if a candidate does not exist run this..
        else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'success',
                //afftectedRows verfies what rows were changed
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
})

//creates a candidate
app.post('/api/candidate', ({ body }, res) => {
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
        if (err) {
            res.status(400).json({ error: errors });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    })
});

// show a candidate
app.get('/api/candidate', (req, res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});