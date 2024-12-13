const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const orderRoutes = require("./routes/orders"); // Import routes

const app = express();
const port = process.env.PORT || 10000;
const allowedOrigins = [
  "https://peddivenkataramana.github.io/AppRes", // GitHub Pages URL
];
const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root Route for verification (GET /)
app.get("/", (req, res) => {
  res.send("Server is running on port " + port);
});

// MongoDB connection URI (replace with your MongoDB URI)
const uri = "mongodb+srv://New:New123@cluster0.u5bii.mongodb.net/";

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// Use routes for orders
app.use("/api/orders", orderRoutes); // Use the routes from `orders.js`
app.use("/AppRes", require("./routes/orders")); // Adding the new route for adding orders

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
