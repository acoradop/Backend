const mysql = require('mysql2');

/*const db = mysql.createConnection({
  host: 'sql5.freesqldatabase.com',
  user: 'sql5733806',
  password: 'Ztb3Bbkuky',
  database: 'sql5733806'
});*/

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clinica'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = db;