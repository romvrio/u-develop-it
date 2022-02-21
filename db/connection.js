const mysql = require('mysql2');

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


module.exports = db;