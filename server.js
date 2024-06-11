const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//dotenv configuration
dotenv.config();

//db Connection
connectDB();

//rest object
app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Hello world</h1>");
});

//port
const PORT = process.env.PORT || 8000;

//listen
app.listen(PORT, () => {
  console.log(`Node Server running in ${PORT}`.bgGreen.white);
});
