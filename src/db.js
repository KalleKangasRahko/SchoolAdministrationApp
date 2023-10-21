const sql = require('mssql');

const config = {
    server: 'schooladminapp.database.windows.net', // Azure SQL server name
    database: 'SchoolDB', // Database name
    user: 'tonyiommi',
    password: 'Kekkonen321',
    options: {
        encrypt: true, // Use SSL encryption
    },
};

let connect = async () => {
    try {
        await sql.connect(config);
        console.log('Connected to Azure sql database');
    }
    catch (error) {
        console.error('Error connecting to Azure SQL database: ' + error);
    }
}

let close = () => {
    sql.close();
    console.log('Closed Azure SQL database connection');
}

let query = async (q, params) => {
    try {
        const result = await sql.query(q, params);
        return result.recordset;
    }
    catch (error) {
        console.error('Error executing SQL query:', error);
        throw error;
    }
}

module.exports = { connect, close, query };

/*const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kekkonen321',
    database: 'school'
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

module.exports = connection;*/