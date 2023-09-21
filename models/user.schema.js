// user sschemas

const mongoose = require('../databases/conn');
const { Schema } = mongoose;

const users = mongoose.model(
  'users',
  new Schema(
    {
      username: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        require: true,
      },
      password: {
        type: String,
        require: true,
      },
    },
    { timestamps: true },
  ),
);

module.exports = users;
