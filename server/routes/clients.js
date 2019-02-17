const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Client = require('../models/clients');
const { verifyToken, verifyRoles } = require('../middlewares/authentication');

const app = express();


app.get('/client/:clientId', verifyToken, (req, res) => {
    if (req.params.clientId) {
        Client.find({ _id: req.params.clientId }).exec((err, clients) => {
            if (err) {
                res.json({
                    success: false,
                    response: err,
                });
            }
            if (clients.length > 0) {
                res.status(200).json({
                    success: true,
                    response: clients[0],
                });
            } else {
                res.status(404).json({
                    success: false,
                    response: 'Client not found.',
                });
            }
        });
    } else {
        res.status(400).json({
            success: false,
            response: 'Missing client id argument.',
        });
    }
});


app.get('/client/name/:clientName', verifyToken, (req, res) => {
    if (req.params.clientName) {
        Client.find({ name: req.params.clientName }).exec((err, clients) => {
            if (err) res.send(err);
            if (clients.length > 0) {
                res.status(200).json({
                    success: true,
                    clients
                });
            } else {
                res.status(404).json({
                    success: false,
                    response: 'Clients not found.',
                });
            }
        });
    } else {
        res.status(400).json({
            success: false,
            response: 'Missing client name argument',
        });
    }
});


module.exports = app;