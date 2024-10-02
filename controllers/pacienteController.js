const Paciente = require('../models/pacienteModel');
const { validationResult } = require('express-validator');
const moment = require('moment');

exports.ObtenerPacientes = (req, res) => {
  Paciente.ObtenerTodas((err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
};

exports.ObtenerConsultasAS = (req, res) => {
  const id = req.params.id; // Capturamos el id desde la URL

  Paciente.ObtenerConsultas(id, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
};

exports.ObtenerFichaMedica = (req, res) => {
  const id = req.params.id; // Capturamos el id desde la URL

  Paciente.ObtenerFichaMe(id, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
};




exports.CrearPaciente = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre_paciente, apellido_paciente,fechadenacimiento_paciente,sexo_paciente, telefono_paciente,correo_paciente,
    activo_paciente,alergico_paciente,desalergias_paciente } = req.body;
  Paciente.Crear(nombre_paciente, apellido_paciente,fechadenacimiento_paciente,sexo_paciente, telefono_paciente,correo_paciente,
    activo_paciente,alergico_paciente,desalergias_paciente, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ id_paciente: result.insertId, nombre_paciente, apellido_paciente,fechadenacimiento_paciente,sexo_paciente, telefono_paciente,correo_paciente,
      activo_paciente,alergico_paciente,desalergias_paciente });
  });
};

exports.ActualizarPaciente = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id_paciente } = req.params;
  const datosNuevos = req.body;
  
  Paciente.Actualizar(id_paciente, datosNuevos, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Paciente actualizado' });
  });
};

exports.ActualizarFicha = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id_consulta } = req.params;
  const datosNuevos = req.body;
  
  Paciente.ActualizarFicha(id_consulta, datosNuevos, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Ficha Médica actualizada' });
  });
};

exports.EliminarPaciente = (req, res) => {
  const { id_paciente } = req.params;
  Paciente.Eliminar(id_paciente, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Paciente eliminado' });
  });
};

exports.EliminarFichaM = (req, res) => {
  const { id_consulta } = req.params;
  Paciente.EliminarfichaM(id_consulta, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Ficha Médica eliminada' });
  });
};


exports.BuscarPaciente = (req, res) => {
  const { nombre_paciente } = req.params;
  Paciente.Buscar(nombre_paciente, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Paciente encontrado' });
  });
};

exports.idPaciente = (req, res) => {
  const { id_paciente } = req.params;
  Paciente.BuscarID(id_paciente, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Verifica si se encontró el paciente
    if (result.length > 0) {
      // Envía los datos del paciente en la respuesta
      res.json(result[0]);
    } else {
      // Si no se encontró ningún paciente, envía un mensaje de error
      res.status(404).json({ message: 'Paciente no encontrado' });
    }
  });
};

exports.CrearConsulta = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fechade_consulta, sintomas_consulta,diagnostico_consulta,tratamiento_consulta, hora_consulta, fk_id_paciente } = req.body;
  Paciente.CrearConsulta(fechade_consulta, sintomas_consulta,diagnostico_consulta,tratamiento_consulta, hora_consulta, fk_id_paciente, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ id_consulta: result.insertId, fechade_consulta, sintomas_consulta,diagnostico_consulta,tratamiento_consulta, hora_consulta, fk_id_paciente });
  });
};
/*LOS CONTADORES */
/*PARA LOS PACIENTES */
exports.contarPacientes = (req, res) => {
  Paciente.ContarPacientes((err, total) => {
    if (err) {
      return res.status(500).json({ error: "Error al contar pacientes" });
    }
    res.json({ total });
  });
};

// Contar consultas diarias
exports.contarConsultasDiarias = (req, res) => {
  const fecha = req.params.fecha; // Cambia según tu lógica

  Paciente.contarConsultasDiarias(fecha)
    .then((consultasDiarias) => {
      res.json({ consultasDiarias });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error al contar consultas diarias" });
    });
};

// Contar consultas mensuales
exports.contarConsultasMensuales = (req, res) => {
  const mes = req.params.mes; // Cambia según tu lógica

  Paciente.contarConsultasMensuales(mes)
    .then((consultasMensuales) => {
      res.json({ consultasMensuales });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error al contar consultas mensuales" });
    });
};

// Guardar registro mensual
exports.guardadodeRegistroMensual = (req, res) => {
  const { consultasdiarias_reportes, consultasmensuales_reporte } = req.body;

  // Comprueba si los valores son válidos
  if (consultasdiarias_reportes == null || consultasmensuales_reporte == null) {
    return res.status(400).json({ error: 'Faltan datos necesarios' });
  }

  // Llama a la función para guardar en la base de datos
  Paciente.guardarRegistroMensual(consultasdiarias_reportes, consultasmensuales_reporte)
    .then(result => {
      res.status(201).json({ message: 'Registro guardado', result });
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al guardar el registro', details: error });
    });
};

// Guardar registro diario
exports.guardarRegistroDiario = (req, res) => {
  const { registroDiario, registroMensual, fkIdReportesConsultas } = req.body;

  Paciente.guardarRegistroDiario(registroDiario, registroMensual, fkIdReportesConsultas)
    .then(() => {
      res.status(201).json({ message: "Registro diario guardado" });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error al guardar registro diario" });
    });
};


exports.guardardeRegistroReportes = (req, res) => {
  // Llama a la función del modelo para guardar el registro
  Paciente.guardarRegistroReportes((error, results) => {
    if (error) {
      return res.status(500).json({ 
        error: 'Error al guardar el registro', 
        details: error 
      });
    }
    
    // Responde con un mensaje de éxito y los resultados
    res.status(201).json({ 
      message: 'Registro guardado correctamente', 
      results 
    });
  });
};