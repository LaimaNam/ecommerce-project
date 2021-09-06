import Product from '../models/productModel.js';

const getProductsByCategory = async (req, res) => {
  let productCategory = req.params.category;
  let productsByCategory = await Product.find({ category: productCategory });

  res.json(productsByCategory);
};

export default getProductsByCategory;
