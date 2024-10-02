const userModel = require('../models/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.crearUsuario = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { usuario_login, contrasena_login } = req.body;

    userModel.crearUsuario(usuario_login, contrasena_login, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id_login: result.insertId, usuario_login });
    });
};

exports.obtenerUsuarios = (req, res) => {
    userModel.obtenerUsuarios((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
};

exports.actualizarUsuario = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_login } = req.params;
    const usuario_actualizado = req.body;

    userModel.actualizarUsuario(id_login, usuario_actualizado, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Usuario actualizado' });
    });
};

exports.eliminarUsuario = (req, res) => {
    const { id_login } = req.params;
    userModel.eliminarUsuario(id_login, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Usuario eliminado' });
    });
};
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { usuario_login, contrasena_login } = req.body;

    try {

        userModel.loginUser(usuario_login, async (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (results.length > 0) {
                const user = results[0];
                const isMatch = await bcrypt.compare(contrasena_login, user.contrasena_login);

                if (isMatch) {
                    res.json({
                        success: true,
                        nombre: user.usuario_login,
                    });
                } else {
                    res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
                }
            } else {
                res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            }
        });
    } catch (error) {
        console.error('Error al autenticar al usuario', error);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};