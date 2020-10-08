const mongoose = require('mongoose');

const uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:27017/think-green-landingpage?authSource=admin`

class Database {
    constructor() {
        mongoose.set('useCreateIndex', true);
        this._connect()
    }

    _connect() {
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log('Database connection successful')
        ).catch(err => console.error(`Database connection error: ${err.message}`)
        );
    }
}

module.exports = new Database();