import FoodItems from "../models/foodItemsModel.js";

export const createFoodItem = async (req, res, next) => {
  try {
    const { name, price, image, menuID } = req.body;
    const fooditem = await FoodItems.findOne({ name });

    if (fooditem) {
      return res.status(400).json({
        status: "fail",
        message: "This category already exists",
      });
    } else {
      const newFI = await FoodItems.create({
        name,
        price,
        menuID,
      });

      return res.status(201).json({
        status: "success",
        data: newFI,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong, please try again later.",
    });
  }
};

export const getOneFoodItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    // fi => food item
    const fi = await FoodItems.findById(id);
    if (!fi) {
      return res.status(400).json({
        status: "fail",
        message: "This food item does not exist",
      });
    } else {
      return res.status(200).json({
        status: "success",
        data: fi,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong, please try again later.",
    });
  }
};
