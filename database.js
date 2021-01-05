const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/think-green-landingpage?${process.env.MONGODB_URL_PARAMETERS}`

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