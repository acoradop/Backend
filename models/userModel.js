const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.crearUsuario = (usuario_login, contrasena_login, callback) => {
    const hashedPassword = bcrypt.hashSync(contrasena_login, 10);
    db.query(
        'INSERT INTO tbl_login (usuario_login, contrasena_login) VALUES (?, ?)',
        [usuario_login, hashedPassword],
        callback
    );
};

exports.obtenerUsuarios = (callback) => {
    db.query('SELECT * FROM tbl_login', callback);
};
exports.loginUser = (usuario_login, callback) => {
    db.query('SELECT * FROM tbl_login WHERE usuario_login = ?', [usuario_login], callback);
};
exports.actualizarUsuario = (id_login, usuario_actualizado, callback) => {
    const { usuario_login, contrasena_login } = usuario_actualizado;
    const hashedPassword = contrasena_login ? bcrypt.hashSync(contrasena_login, 10) : undefined;
    
    const sql = contrasena_login 
        ? 'UPDATE tbl_login SET usuario_login = ?, contrasena_login = ? WHERE id_login = ?'
        : 'UPDATE tbl_login SET usuario_login = ? WHERE id_login = ?';

    const params = contrasena_login 
        ? [usuario_login, hashedPassword, id_login]
        : [usuario_login, id_login];
    
    db.query(sql, params, callback);
};

exports.eliminarUsuario = (id_login, callback) => {
    db.query('DELETE FROM tbl_login WHERE id_login = ?', [id_login], callback);
};
