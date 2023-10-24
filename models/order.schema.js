const mongoose = require('../databases/conn');
const { Schema } = mongoose;

const order = mongoose.model(
  'Order',
  new Schema(
    {
      usernameClient: {
        type: String,
        require: true,
      },
      usernameProvider: {
        type: String,
        require: true,
      },
      type: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: 'in progress',
      },
    },
    { timestamps: true },
  ),
);

module.exports = order;
