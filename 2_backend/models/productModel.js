import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    subcategory: {
      type: String,
      required: false,
    },

    image: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('product', productSchema);

export default Product;
