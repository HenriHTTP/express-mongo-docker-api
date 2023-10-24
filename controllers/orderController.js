//order controller
const orders = require('../models/order.schema');

class orderController {
  static async createOrder(req, res) {
    const { usernameClient, usernameProvider, type } = req.body;
    const newOrder = new orders({
      usernameClient,
      usernameProvider,
      type,
    });

    try {
      await newOrder.save();
      const order = await orders.findOne({ usernameClient: usernameClient });
      res.status(200).json(order);
    } catch (err) {
      res.json(err);
    }
  }
}
module.exports = orderController;
