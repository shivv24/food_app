const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

//routes
//Post || create Food
router.post("/create", authMiddleware, createFoodController);

//get all food
router.get("/getall", getAllFoodController);

//get single food
router.get("/get/:id", getSingleFoodController);

//get food by restaurant
router.get("/getByRestaurant/:id", getFoodByRestaurantController);

//update food
router.put("/update/:id", authMiddleware, updateFoodController);

//delete food
router.delete("/delete/:id", authMiddleware, deleteFoodController);

//place order
router.post("/placeorder", authMiddleware, placeOrderController);

//order status
router.post(
  "/orderstatus/:id",
  authMiddleware,
  adminMiddleware,
  orderStatusController
);

module.exports = router;
