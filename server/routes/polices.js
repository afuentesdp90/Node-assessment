const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Client = require('../models/clients');
const Policy = require('../models/polices');
const { verifyToken, verifyRoles } = require('../middlewares/authentication');


const app = express();


app.get('/polices/:clientName', [verifyToken, verifyRoles], (req, res) => {
    if (req.params.clientName) {
        Policy.searchByClientName(req.params.clientName).then((response) => {
            res.status(200).json({
                success: true,
                response
            });
        }).catch((response) => {
            res.status(404).json({
                success: false,
                response: 'Policy not found!'
            });
        });
    } else {
        res.status(400).json({
            success: false,
            response: 'Missing client name argument',
        });
    }
});

app.get('/client/policy/:policyId', [verifyToken, verifyRoles], (req, res) => {
    if (req.params.policyId) {
        Client.searchByPolicyNumber(req.params.policyId).then((response) => {
            res.status(200).json({
                success: true,
                response
            });
        }).catch((response) => {
            res.status(404).json({
                success: false,
                response
            });
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Missing policy id argument.',
        });
    }
});


module.exports = app;