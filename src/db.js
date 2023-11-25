const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kekkonen321',
    database: 'school',
    multipleStatements: true
});

connection.connect((error) => {
    if (error) {
        console.error('Database connection error:', error);
    } else {
        console.log('Database connected successfully.');
    }
});

connection.on('error', (error) => {
    console.error('Database connection error:', error);
});

process.on('SIGINT', () => {
    connection.end();
});

module.exports = connection;