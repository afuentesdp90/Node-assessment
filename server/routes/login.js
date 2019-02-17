require('../config/config');

const express = require('express');
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Client = require('../models/clients');

const app = express();

app.post('/login', (req, res) => {
    let body = req.body;

    Client.findOne({ email: body.email }, (err, DBuser) => {
        if (err) {
            return res.status(500).json({
                success: false,
                err
            });
        }

        if (!DBuser) {
            return res.status(400).json({
                success: false,
                err: {
                    message: 'Incorrect username or password!'
                }
            });
        }

        if (!bycrpt.compareSync(body.password, DBuser.password)) {
            return res.status(400).json({
                success: false,
                err: {
                    message: 'Incorrect username or password!'
                }
            });
        }

        let token = jwt.sign({
            user: DBuser
        }, process.env.SEED, { expiresIn: process.env.TOKEN_CADUCITY });

        res.json({
            success: true,
            token
        });

    });
});


module.exports = app;