import mongoose from "mongoose";

const foodItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please entert the food item name"],
  },
  price: {
    type: Number,
    required: [true, "Please entert the price"],
  },
  image: {
    type: String,
  },
  menuID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: [true, "A food item must belong to a menu"],
  },
});

const FoodItems = mongoose.model("FoodItems", foodItemsSchema);

export default FoodItems;
