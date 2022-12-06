
const env = require('dotenv')
env.config() 
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected')
});

// Models
require('./Category');
require('./Recipe');
require('./User')