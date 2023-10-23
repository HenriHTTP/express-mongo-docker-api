const mongoose = require('../databases/conn');
const { Schema } = mongoose;

const order = mongoose.model(
  'Order',
  new Schema(
    {
      username_client: {
        type: String,
        require: true,
      },
      username_provider: {
        type: String,
        require: true,
      },
      type: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
    { timestamps: true },
  ),
);

module.exports = order;
