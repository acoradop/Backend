const citaModel = require('../models/citaModel');
const { validationResult } = require('express-validator');

exports.crearCita = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fecha_cita, hora_inicio_cita, hora_fin_cita, id_cliente, id_servicio } = req.body;
    citaModel.crearCita(fecha_cita, hora_inicio_cita, hora_fin_cita, id_cliente, id_servicio, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id_cita: result.insertId, fecha_cita, hora_inicio_cita, hora_fin_cita, id_cliente, id_servicio });
    });
};

exports.obtenerCitas = (req, res) => {
    citaModel.obtenerCitas((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
};

exports.actualizarCita = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_cita } = req.params;
    const datosActualizados = req.body;

    citaModel.actualizarCita(id_cita, datosActualizados, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Cita actualizada' });
    });
};

exports.eliminarCita = (req, res) => {
    const { id_cita } = req.params;
    citaModel.eliminarCita(id_cita, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Cita eliminada' });
    });
};
