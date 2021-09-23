import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerSurname: {
      type: String,
      required: true,
    },
    customerAddress: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    order: {
      type: Array,
      required: true,
    },
    priceSubtotal: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('order', orderSchema);

export default Order;
