const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// env path
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Connection URI
const uri = process.env.MONGO_URL;

//mongo connect
mongoose
  .connect(uri)
  .then(() => {
    console.log(`Conecct to MongoDB  port ${process.env.DB_PORT_APP} `);
  })
  .catch((err) => {
    console.error(`Erro in  MongoDB connection:', ${err}`);
  });

module.exports = mongoose;
