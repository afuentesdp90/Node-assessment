const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let clientSchema = new Schema({
    _id: { type: String },
    name: { type: String },
    password: { type: String },
    email: { type: String },
    role: { type: String }
});



clientSchema.methods.toJSON = function() {
    const client = this;
    let clientObject = client.toObject();
    delete clientObject.password; //Delete password to object
    return clientObject;
}


clientSchema.statics.searchByPolicyNumber = function(policyId) {
    const model = this;
    return new Promise((resolve, reject) => {
        Policy.findOne({ _id: policyId }, (err, policy) => {
            if (policy) {
                model.findOne({ _id: policy.clientId }, (err1, client) => {
                    resolve(client);
                });
            } else {
                reject('Policy not found.');
            }
        });
    });
};

module.exports = mongoose.model('Client', clientSchema);

let Policy = require('./polices');