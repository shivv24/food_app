const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

//create food
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;
    //validation
    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please provide all Fields",
      });
    }
    const newFood = foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });
    await newFood.save();
    res.status(200).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food API",
      error,
    });
  }
};

const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      console.log(error);
      res.status(404).send({
        success: false,
        message: "No Food Found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all food API",
      error,
    });
  }
};

const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      res.status(404).send({
        success: false,
        message: "Please provide Id",
      });
    }
    const food = await foodModel.findById(foodId);
    res.status(200).send({
      success: true,
      food,
    });
    if (!food) {
      res.status(404).send({
        success: false,
        message: "No Food Found with this id",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get single food API",
      error,
    });
  }
};

//get Food by resaturant
const getFoodByRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      res.status(404).send({
        success: false,
        message: "Please provide restaurant Id",
      });
    }
    const food = await foodModel.find({ restaurant: restaurantId });
    console.log(food);
    res.status(200).send({
      message: "Food Based on Restaurant",
      success: true,
      food,
    });
    if (!food) {
      res.status(404).send({
        success: false,
        message: "No Food Found with this id",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get single food API",
      error,
    });
  }
};

const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "No food id was found",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food item was Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update food API",
      error,
    });
  }
};

const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "provide food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with id",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food Item Deleted ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete food API",
      error,
    });
  }
};

//place order
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(404).send({
        success: false,
        message: "Please food cart or payment method",
      });
    }
    let total = 0;
    //calculate
    cart.map((i) => {
      total += i.price;
    });
    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in place order API",
      error,
    });
  }
};

//change order status
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please provide valid order Id",
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in order status API",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};
