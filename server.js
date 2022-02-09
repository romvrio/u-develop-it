const express = require('express');
const mysql = require('mysql2');
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

// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(row);
//     }
// });

// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });

// Create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
//               VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});