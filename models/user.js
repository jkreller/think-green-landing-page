const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    registered_at: {type: Date, default: Date.now, required: true},
    confirmed_at: {type: Date},
    registration_ip_address: {type: String},
    confirmation_ip_address: {type: String}
}, {
    versionKey: false
});

module.exports = mongoose.model('user', schema);