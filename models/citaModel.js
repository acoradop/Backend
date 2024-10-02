const db = require('../config/db');

const Cita = {};

Cita.crearCita = (fecha_cita, hora_inicio_cita, hora_fin_cita, id_cliente, id_servicio, callback) => {
    const sql = 'INSERT INTO tbl_cita (fecha_cita, hora_inicio_cita, hora_fin_cita, id_cliente, id_servicio) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [fecha_cita, hora_inicio_cita, hora_fin_cita, id_cliente, id_servicio], callback);
};

Cita.obtenerCitas = (callback) => {
    const sql = 'SELECT * FROM tbl_cita';
    db.query(sql, callback);
};

Cita.actualizarCita = (id_cita, datosActualizados, callback) => {
    const { fecha_cita, hora_inicio_cita, hora_fin_cita, id_cliente, id_servicio } = datosActualizados;
    const sql = 'UPDATE tbl_cita SET fecha_cita = ?, hora_inicio_cita = ?, hora_fin_cita = ?, id_cliente = ?, id_servicio = ? WHERE id_cita = ?';
    db.query(sql, [fecha_cita, hora_inicio_cita, hora_fin_cita, id_cliente, id_servicio, id_cita], callback);
};

Cita.eliminarCita = (id_cita, callback) => {
    const sql = 'DELETE FROM tbl_cita WHERE id_cita = ?';
    db.query(sql, [id_cita], callback);
};

module.exports = Cita;
