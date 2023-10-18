// user sschemas

const mongoose = require('../databases/conn');
const { Schema } = mongoose;

const users = mongoose.model(
  'users',
  new Schema(
    {
      name: {
        type: String,
        require: true,
      },
      lastname: {
        type: String,
        require: true,
      },
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
      avatar: {
        type: String,
        required: false,
      },
    },
    { timestamps: true },
  ),
);

module.exports = users;
