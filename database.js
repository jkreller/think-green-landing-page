const mongoose = require('mongoose');

const username = 'digger-admin';
const password = 'Di98gg76er!';
const uri = `mongodb://${username}:${password}@digger-shard-00-00-pa822.mongodb.net:27017,digger-shard-00-01-pa822.mongodb.net:27017,digger-shard-00-02-pa822.mongodb.net:27017/landingpage?ssl=true&replicaSet=digger-shard-0&authSource=admin&retryWrites=true`;

class Database {
  constructor() {
    mongoose.set('useCreateIndex', true);
    this._connect()
  }

  _connect() {
    //mongoose.connect(uri, {
    //  useNewUrlParser: true,
    //  useUnifiedTopology: true,
    //}).then(() => console.log('Database connection successful')
    //).catch(err => console.error(`Database connection error: ${err.message}`)
    //);
  }
}

module.exports = new Database();