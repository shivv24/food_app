const categoryModel = require("../models/categoryModel");

//create cat
const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    //validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Please provide category title or image",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "Category Created Successfully",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in create Cat API",
    });
  }
};

const getAllCatController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No category found",
      });
    }
    res.status(200).send({
      success: true,
      totalcat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in get All Cat API",
    });
  }
};

const updateCatController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updateCatController) {
      return res.status(500).send({
        success: false,
        message: "No category Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "updated category successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in update Cat API",
    });
  }
};

const deleteCatController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(500).send({
        success: false,
        message: "please provide cat id",
      });
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      res.status(500).send({
        success: false,
        message: "Cat Not Found",
      });
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Cat Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete Cat API",
      error,
    });
  }
};

module.exports = {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
};
