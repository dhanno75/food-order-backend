import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  foodItems: [
    {
      foodItemsID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItems",
        required: true,
      },
      name: String,
      quantity: {
        type: Number,
        default: 0,
      },
      price: Number,
    },
  ],
  totalCost: {
    type: Number,
    default: 0,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
