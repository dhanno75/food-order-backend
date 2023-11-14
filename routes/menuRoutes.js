import express from "express";
import {
  createMenu,
  getAllMenus,
  getFooditemsBasedOnMenu,
} from "../controllers/menuController.js";

const router = express.Router();

router.route("/").post(createMenu).get(getAllMenus);
router.route("/:menuID").get(getFooditemsBasedOnMenu);

export default router;
