const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
const { body } = require('express-validator');

router.post('/cita', [
    body('fecha_cita').notEmpty().withMessage('La fecha de la cita es obligatoria').isDate().withMessage('Fecha inválida'),
    body('hora_inicio_cita').notEmpty().withMessage('La hora de inicio es obligatoria').isString().withMessage('Hora de inicio inválida'),
    body('hora_fin_cita').notEmpty().withMessage('La hora de fin es obligatoria').isString().withMessage('Hora de fin inválida'),
    body('id_cliente').notEmpty().withMessage('El ID del cliente es obligatorio').isInt().withMessage('ID del cliente debe ser un número entero'),
    body('id_servicio').notEmpty().withMessage('El ID del servicio es obligatorio').isInt().withMessage('ID del servicio debe ser un número entero')
], citaController.crearCita);

router.get('/citas', citaController.obtenerCitas);

router.put('/cita/:id_cita', [
    body('fecha_cita').optional().isDate().withMessage('Fecha inválida'),
    body('hora_inicio_cita').optional().isString().withMessage('Hora de inicio inválida'),
    body('hora_fin_cita').optional().isString().withMessage('Hora de fin inválida'),
    body('id_cliente').optional().isInt().withMessage('ID del cliente debe ser un número entero'),
    body('id_servicio').optional().isInt().withMessage('ID del servicio debe ser un número entero')
], citaController.actualizarCita);

router.delete('/cita/:id_cita', citaController.eliminarCita);

module.exports = router;
