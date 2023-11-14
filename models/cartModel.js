import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  foodItems: [
    {
      foodItemsID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItems",
        required: true,
      },
      quantity: {
        type: Number,
        default: 0,
      },
      price: {
        type: Number,
        default: 0,
      },
      name: String,
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

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
