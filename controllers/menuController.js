import Menu from "../models/menuModel.js";
import FoodItems from "../models/foodItemsModel.js";

// Create new menu
export const createMenu = async (req, res, next) => {
  try {
    const { name } = req.body;
    const menu = await Menu.findOne({ name });

    if (menu) {
      return res.status(400).json({
        status: "fail",
        message: "This menu already exists",
      });
    } else {
      const newMenu = await Menu.create({ name });
      return res.status(201).json({
        status: "success",
        data: newMenu,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "success",
      message: "Something went wrong. Please try again later.",
    });
  }
};

// Get all menus
export const getAllMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find();
    return res.status(200).json({
      status: "success",
      data: menus,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong, please try again later.",
    });
  }
};

// Get food items based on menu
export const getFooditemsBasedOnMenu = async (req, res, next) => {
  try {
    const { menuID } = req.params;

    const fooditems = await FoodItems.find({ menuID });

    if (fooditems.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No food items found in this category",
      });
    } else {
      return res.status(200).json({
        status: "success",
        data: fooditems,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
