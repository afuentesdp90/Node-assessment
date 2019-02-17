const http = require('http');
const Client = require('./models/clients');
const Policy = require('./models/polices');
const bcrypt = require('bcrypt');


// Load clients data
exports.clientsLoad = () => {
    return new Promise((resolve, reject) => {
        Client.find((err, clients) => {
            if (err) console.error(err);
            if (clients.length === 0) {
                console.log('Loading clients to database');
                const options = {
                    host: 'www.mocky.io',
                    path: '/v2/5808862710000087232b75ac',
                };
                http.get(options, (res) => {
                    let clientsData = '';
                    res.on('data', (d) => {
                        clientsData += d;
                    });
                    res.on('end', () => {
                        clientsData = JSON.parse(clientsData).clients;
                        clientsData.forEach((client) => {
                            new Client({
                                _id: client.id,
                                name: client.name,
                                password: bcrypt.hashSync(client.name, 10),
                                email: client.email,
                                role: client.role,
                            }).save((err) => {
                                if (err) console.error(err);
                            });
                        });
                        resolve('Clients fixture loaded successfully');
                    });
                }).on('error', (err) => {
                    reject(`Error: ${err.message}`);
                });
            } else {
                resolve('Clients already loaded, no need to load again.');
            }
        });
    });
};

// Load policies data
exports.policiesLoad = () => {
    return new Promise((resolve, reject) => {
        Policy.find((err, policies) => {
            if (err) console.error(err);
            if (policies.length === 0) {
                console.log('Loading policies to database');
                const options = {
                    host: 'www.mocky.io',
                    path: '/v2/580891a4100000e8242b75c5',
                };
                http.get(options, (res) => {
                    let policiesData = '';
                    res.on('data', (d) => {
                        policiesData += d;
                    });
                    res.on('end', () => {
                        policiesData = JSON.parse(policiesData).policies;
                        policiesData.forEach((policy) => {
                            new Policy({
                                _id: policy.id,
                                amountInsured: policy.amountInsured,
                                email: policy.email,
                                inceptionDate: policy.inceptionDate,
                                installmentPayment: policy.installmentPayment,
                                clientId: policy.clientId,
                            }).save((err) => {
                                if (err) console.error(err);
                            });
                        });
                        resolve('Policies fixture loaded successfully');
                    });
                }).on('error', (err) => {
                    reject.reason(`Error: ${err.message}`);
                });
            } else {
                resolve('Policies already loaded, no need to load again.');
            }
        });
    });
};