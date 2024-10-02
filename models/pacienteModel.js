const db = require("../config/db");
const Paciente = {};
const Consulta = {};

Paciente.ObtenerTodas = (callback) => {
  const sql = "SELECT * FROM tbl_paciente";
  db.query(sql, callback);
};

Paciente.ObtenerConsultas = (fk_id_paciente, callback) => {
  const sql = `
    SELECT 
      tbl_consulta.id_consulta,
      tbl_consulta.fechade_consulta, 
      tbl_consulta.hora_consulta,
      tbl_paciente.nombre_paciente, 
      tbl_paciente.apellido_paciente,  
      tbl_paciente.fechadenacimiento_paciente 
    FROM  
      tbl_paciente 
    JOIN 
      tbl_consulta ON tbl_paciente.id_paciente = tbl_consulta.fk_id_paciente 
    WHERE 
      tbl_paciente.id_paciente = ? 
    ORDER BY 
      tbl_consulta.hora_consulta DESC`;

  db.query(sql, [fk_id_paciente], callback);
};

Paciente.ObtenerFichaMe = (fk_id_paciente, callback) => {
  const sql = `
    SELECT 
      p.id_paciente , 
      p.nombre_paciente , 
      p.apellido_paciente , 
      p.fechadenacimiento_paciente, 
      p.sexo_paciente , 
      CASE 
            WHEN p.desalergias_paciente = 1 THEN 'Sí' 
            ELSE 'No' 
      END AS desalergias_paciente, 
      c.fechade_consulta , 
      c.sintomas_consulta , 
      c.diagnostico_consulta , 
      c.tratamiento_consulta 
    FROM 
      tbl_paciente p
    INNER JOIN 
      tbl_consulta c 
    ON 
      p.id_paciente = c.fk_id_paciente
    WHERE
      c.id_consulta=?`;

  db.query(sql, [fk_id_paciente], callback);
};

Paciente.Crear = (
  nombre_paciente,
  apellido_paciente,
  fechadenacimiento_paciente,
  sexo_paciente,
  telefono_paciente,
  correo_paciente,
  activo_paciente,
  alergico_paciente,
  desalergias_paciente,
  callback
) => {
  const sql =
    "INSERT INTO tbl_paciente (nombre_paciente, apellido_paciente,fechadenacimiento_paciente,sexo_paciente, telefono_paciente,correo_paciente,activo_paciente,alergico_paciente,desalergias_paciente) VALUES (?, ?, ?,?, ?, ?,?, ?, ?)";
  db.query(
    sql,
    [
      nombre_paciente,
      apellido_paciente,
      fechadenacimiento_paciente,
      sexo_paciente,
      telefono_paciente,
      correo_paciente,
      activo_paciente,
      alergico_paciente,
      desalergias_paciente,
    ],
    callback
  );
};

Paciente.Eliminar = (id_paciente, callback) => {
  const sql = "DELETE FROM tbl_paciente WHERE id_paciente = ?";
  db.query(sql, [id_paciente], callback);
};

Paciente.EliminarfichaM = (id_consulta, callback) => {
  const sql = "DELETE FROM tbl_consulta WHERE id_consulta = ?";
  db.query(sql, [id_consulta], callback);
};

Paciente.Actualizar = (id_paciente, datosNuevos, callback) => {
  const sql = "UPDATE tbl_paciente SET ? WHERE id_paciente = ?";
  db.query(sql, [datosNuevos, id_paciente], callback);
};

Paciente.ActualizarFicha = (id_consulta, datosNuevos, callback) => {
  const sql = "UPDATE tbl_consulta SET ? WHERE id_consulta = ?";
  db.query(sql, [datosNuevos, id_consulta], callback);
};

Paciente.Buscar = (nombre_paciente, callback) => {
  db.query(
    "SELECT * FROM tbl_paciente WHERE nombre_paciente = ?",
    [nombre_paciente],
    callback
  );
};

Paciente.BuscarID = (id_paciente, callback) => {
  db.query(
    "SELECT * FROM tbl_paciente WHERE id_paciente = ?",
    [id_paciente],
    callback
  );
};

Paciente.Buscarsintomas = (id_paciente, callback) => {
  db.query(
    "SELECT * FROM tbl_consulta WHERE fk_id_paciente = ?",
    [id_paciente],
    callback
  );
};

Paciente.CrearConsulta = (
  fechade_consulta,
  sintomas_consulta,
  diagnostico_consulta,
  tratamiento_consulta,
  hora_consulta,
  fk_id_paciente,
  callback
) => {
  const sql =
    "INSERT INTO tbl_consulta(fechade_consulta, sintomas_consulta,diagnostico_consulta,tratamiento_consulta,hora_consulta, fk_id_paciente ) VALUES (?,?, ?, ?,?, ?)";
  db.query(
    sql,
    [
      fechade_consulta,
      sintomas_consulta,
      diagnostico_consulta,
      tratamiento_consulta,
      hora_consulta,
      fk_id_paciente,
    ],
    callback
  );
};

/*PARTE DEL CONTADOR */
/*el contador de los pacientes */
Paciente.ContarPacientes = (callback) => {
  const sql = "SELECT COUNT(*) AS total FROM tbl_paciente";
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result[0].total); // Devuelve el número total de pacientes
  });
};

// Contar consultas diarias
Paciente.contarConsultasDiarias = (fecha) => {
  const query = 'SELECT COUNT(*) AS consultasDiarias FROM tbl_consulta WHERE fechade_consulta = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [fecha], (err, result) => {
      if (err) return reject(err);
      resolve(result[0].consultasDiarias);
    });
  });
};

// Contar consultas mensuales
Paciente.contarConsultasMensuales = (mes) => {
  const query = 'SELECT COUNT(*) AS consultasMensuales FROM tbl_consulta WHERE DATE_FORMAT(fechade_consulta, "%Y-%m") = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [mes], (err, result) => {
      if (err) return reject(err);
      resolve(result[0].consultasMensuales);
    });
  });
};

// Obtener el registro actual de reportes de consultas
Paciente.obtenerReportesConsultas = () => {
  const query = 'SELECT * FROM tbl_reportes_consultas ORDER BY id_reportes_consultas DESC LIMIT 1';
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Reiniciar los contadores mensuales en tbl_reportes_consultas
Paciente.reiniciarContadoresMensuales = () => {
  const query = 'UPDATE tbl_reportes_consultas SET consultasdiarias_reportes = 0, consultasmensuales_reporte = 0';
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Guardar el registro mensual
Paciente.guardarRegistroMensual = (consultasDiarias, consultasMensuales) => {
  const query = 'INSERT INTO tbl_reportes_consultas (consultasdiarias_reportes, consultasmensuales_reporte) VALUES (?, ?)';
  return new Promise((resolve, reject) => {
    db.query(query, [consultasDiarias, consultasMensuales], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Guardar el registro diario
Paciente.guardarRegistroDiario = (registroDiario, registroMensual, fkIdReportesConsultas) => {
  const query = 'INSERT INTO tbl_registro_reportes (registrodiario_registros, registrosmensuales_registros, fk_id_reportes_consultas) VALUES (?, ?, ?)';
  return new Promise((resolve, reject) => {
    db.query(query, [registroDiario, registroMensual, fkIdReportesConsultas], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Guardar registros de reportes
Paciente.guardarRegistroReportes = (callback) => {
  const sql = `
    INSERT INTO tbl_registro_reportes (registrodiario_registros, registrosmensuales_registros, fechas_registros, fk_id_reportes_consultas)
    SELECT 
      r.consultasdiarias_reportes,
      r.consultasmensuales_reporte,
      c.fechade_consulta,
      r.id_reportes_consultas
    FROM 
      tbl_reportes_consultas r
    JOIN 
      tbl_consulta c 
    ORDER BY 
      c.fechade_consulta DESC `;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al guardar el registro:", error);
      return callback(error);
    }
    callback(null, results);
  });
};

module.exports = Paciente;
