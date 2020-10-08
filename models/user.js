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

schema.statics.countConfirmed = function () {
    return this.countDocuments({confirmed_at: {$ne: null}});
}

schema.statics.countUnconfirmed = function () {
    return this.countDocuments({confirmed_at: null});
}

schema.statics.deleteUnconfirmedBeforeDate = function (date) {
    return this
        .where({confirmed_at: null})
        .where({registered_at: {$lte: date.toISOString()}})
        .deleteMany();
}

module.exports = mongoose.model('user', schema);