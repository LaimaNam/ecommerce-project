import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Product from './models/productModel.js';

dotenv.config();

import fs from 'fs';

let rawdata = fs.readFileSync('./sample_data/sampleProduct.json');
let products = JSON.parse(rawdata);

Product.deleteMany({});
Product.insertMany(products);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log('Connected to MongoDB...');

    console.log('Db updated');
  })
  .catch((err) => console.log(err));
