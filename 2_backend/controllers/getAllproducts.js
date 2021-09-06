import Product from '../models/productModel.js';

const getAllProducts = async (req, res) => {
  let products = await Product.find({});
  res.json(products);
};

export default getAllProducts;
