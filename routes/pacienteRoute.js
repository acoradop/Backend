const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const { body } = require('express-validator');

router.post('/paciente', [
  
], pacienteController.CrearPaciente);

router.get('/pacientes', pacienteController.ObtenerPacientes);

router.get('/consultaobtener/:id', pacienteController.ObtenerConsultasAS);

router.get('/consultaobtenerFicha/:id', pacienteController.ObtenerFichaMedica);


router.put('/actualizar-paciente/:id_paciente', [
  body('nombre_cliente')
    .optional()
    .isString().withMessage('ERROR El nombre debe ser una cadena de texto'),
  body('apellido_cliente')
    .optional()
    .isString().withMessage('ERROR El apellido debe ser una cadena de texto'),
  body('telefono_cliente')
    .optional()
    .isString().withMessage('ERROR El teléfono debe ser una cadena de texto'),
], pacienteController.ActualizarPaciente);

router.delete('/paciente/:id_paciente', pacienteController.EliminarPaciente);
router.get('/consulta/:nombre_paciente', pacienteController.BuscarPaciente);

router.get('/consultas/:id_paciente', pacienteController.idPaciente);

router.put('/actualizar-ficha/:id_consulta', [
  body('sintomas_consulta')
  .optional()
  .isString().withMessage('ERROR El sintomas debe ser una cadena de texto'),
  body('diagnostico_consulta')
    .optional()
    .isString().withMessage('ERROR El diagnostico debe ser una cadena de texto'),
  body('tratamiento_consulta')
    .optional()
    .isString().withMessage('ERROR El tratamiento debe ser una cadena de texto'),
], pacienteController.ActualizarFicha);


router.post('/consultadepaciente', [
  
], pacienteController.CrearConsulta);


router.delete('/consultaElimF/:id_consulta', pacienteController.EliminarFichaM);

/*LOS CONTADORES */
/*PARA LOS PACIENTES */
// Rutas para contar
router.get('/pacientes/contar', pacienteController.contarPacientes);
router.get('/consultas/diarias/:fecha', pacienteController.contarConsultasDiarias);
router.get('/consultas/mensuales/:mes', pacienteController.contarConsultasMensuales);

// Rutas para guardar registros
router.post('/registros/mensual', pacienteController.guardadodeRegistroMensual);
router.post('/registros/diario', pacienteController.guardarRegistroDiario);
router.post('/registros/guardar', pacienteController.guardardeRegistroReportes);
module.exports = router;
