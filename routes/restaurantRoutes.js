const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
} = require("../controllers/restaurantController");

const router = express.Router();

//routes
//create restaurant || post
router.post("/create", authMiddleware, createRestaurantController);

//get all restaurant || get
router.get("/getall", getAllRestaurantController);

//get restaurant by id || get
router.get("/get/:id", getRestaurantByIdController);

//delete restaurant by id || delete
router.get("/delete/:id", authMiddleware, deleteRestaurantController);

module.exports = router;
