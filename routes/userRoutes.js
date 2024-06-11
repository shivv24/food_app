const express = require("express");
const {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteProfileController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
//GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

//Update USER || PUT
router.put("/updateUser", authMiddleware, updateUserController);

//RESET PASSWORD
router.post("/resetpassword", authMiddleware, resetPasswordController);

//update Password
router.post("/updatepassword", authMiddleware, updatePasswordController);

//delete user
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);

module.exports = router;
