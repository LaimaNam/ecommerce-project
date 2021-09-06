import Product from '../models/productModel.js';

const getProduct = async (req, res) => {
  let productId = req.params.id;
  let product = await Product.findById(productId);
  res.json(product);
};

export default getProduct;
