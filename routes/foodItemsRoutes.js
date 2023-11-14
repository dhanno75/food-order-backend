import express from "express";
import {
  createFoodItem,
  getOneFoodItem,
} from "../controllers/foodItemsController.js";

const router = express.Router();

router.route("/").post(createFoodItem);
router.route("/:id").get(getOneFoodItem);

export default router;
