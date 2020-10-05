const mongoose = require('mongoose');

const uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@127.0.0.1:27017/think-green-landingpage`

class Database {
  constructor() {
    mongoose.set('useCreateIndex', true);
    this._connect()
  }

  _connect() {
    console.info(process.env);
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => console.log('Database connection successful')
    ).catch(err => console.error(`Database connection error: ${err.message}`)
    );
  }
}

module.exports = new Database();