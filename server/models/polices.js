const mongoose = require('mongoose');
const Client = require('./clients');

let Schema = mongoose.Schema;

let policySchema = new Schema({
    _id: { type: String },
    amountInsured: { type: Number },
    email: { type: String },
    inceptionDate: { type: Date },
    installmentPayment: { type: Boolean },
    clientId: { type: String }
});


policySchema.statics.searchByClientName = function(clientName) {
    const model = this;
    return new Promise((resolve, reject) => {
        Client.find({ name: clientName }, (err, clients) => {
            const cliIds = clients.map(c => c._id);
            if (cliIds.length > 0) {
                model.find({ clientId: { $in: cliIds } }, (err, policies) => {
                    resolve(policies);
                });
            } else {
                reject('Client/s not found.');
            }
        });
    });
};


policySchema.statics.searchByName = function(clientName) {
    const model = this;
    return new Promise((resolve, reject) => {
        Client.find({ name: clientName }, (err, client) => {
            const cliIds = clients.map(c => c._id);
            if (cliIds.length > 0) {
                model.find({ clientId: { $in: cliIds } }, (err, policies) => {
                    resolve(policies);
                });
            } else {
                reject('Client/s not found.');
            }
        });
    });
}

module.exports = mongoose.model('Policy', policySchema);