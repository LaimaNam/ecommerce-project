import Order from '../models/orderModel.js';

export const getOrders = async (req, res) => {
  let orders = await Order.find({});
  res.json(orders);
};

export const getOrder = async (req, res) => {
  let orderId = req.params.id;
  let order = await Order.findById(orderId);
  res.json(order);
};

export const postOrder = async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: 'Please enter all inforamtion',
      success: false,
    });
    return;
  }

  console.log(req.body);
  const order = new Order(req.body);
  order
    .save()
    .then((data) => {
      res.json({
        message: 'Your order received.',
        success: true,
      });
    })
    .catch((err) => console.log(err));
};
