import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the category"],
  },
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
