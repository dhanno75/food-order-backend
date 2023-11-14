import Cart from "../models/cartModel.js";
import FoodItems from "../models/foodItemsModel.js";

// Create cart
export const createCart = async (req, res, next) => {
  const userID = req.user._id;

  const { foodItemsID, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userID });
    const fooditem = await FoodItems.findById(foodItemsID);

    if (!fooditem) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    const price = fooditem.price;
    const name = fooditem.name;

    // If cart already exists for user
    if (cart) {
      const foodItemIndex = cart.foodItems.findIndex(
        (fi) => fi.foodItemsID == foodItemsID
      );

      // Check if product exists or not
      if (foodItemIndex > -1) {
        const foodItem = cart.foodItems[foodItemIndex];
        foodItem.quantity += quantity;
        cart.totalCost = cart.foodItems.reduce((acc, el) => {
          return acc + el.quantity * el.price;
        }, 0);
        cart.foodItems[foodItemIndex] = foodItem;
        await cart.save();
        res.status(200).json({
          message: "success",
          data: cart,
        });
      } else {
        cart.foodItems.push({ foodItemsID, name, quantity, price });
        cart.totalCost = cart.foodItems.reduce((acc, el) => {
          return acc + el.quantity * el.price;
        }, 0);
        await cart.save();
        res.status(200).json({
          status: "success",
          data: cart,
        });
      }
    } else {
      // no cart exists, than create one
      const newCart = await Cart.create({
        userID,
        foodItems: [{ foodItemsID, name, quantity, price }],
        totalCost: quantity * price,
      });
      return res.status(201).json({
        status: "success",
        data: newCart,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong, please try again after sometime",
    });
  }
};

// Get cart
export const getCart = async (req, res, next) => {
  const userID = req.user._id;
  try {
    const cart = await Cart.findOne({ userID });
    if (cart && cart.foodItems.length > 0) {
      res.status(200).json({
        status: "success",
        data: cart,
      });
    } else {
      res.send(null);
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong, please try after sometime",
    });
  }
};

// Remove items from the cart
export const removeFoodItemsFromCart = async (req, res, next) => {
  const userID = req.user._id;
  const foodItemsID = req.params.foodItemsID;

  try {
    let cart = await Cart.findOne({ userID });
    const foodItemIndex = cart.foodItems.findIndex(
      (fi) => fi.foodItemsID == foodItemsID
    );

    if (foodItemIndex > -1) {
      let foodItem = cart.products[foodItemIndex];
      cart.totalCost -= foodItem.quantity * foodItem.price;

      if (cart.totalCost < 0) {
        cart.totalCost = 0;
      }

      cart.foodItems.splice(foodItemIndex, 1);
      cart.totalCost = cart.foodItems.reduce((acc, el) => {
        return acc + el.quantity * el.price;
      }, 0);
      cart = await cart.save();
      res.status(200).json({
        status: "success",
        data: cart,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "food item not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
    });
  }
};
