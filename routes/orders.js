const express = require("express");
const Order = require("../models/orders.js");
const router = express.Router();

// Add a new order (POST /AppRes/add)
router.post("/add", async (req, res) => {
  try {
    const order = new Order(req.body); // Saving the order received from frontend
    await order.save(); // Save the order to MongoDB
    res.status(201).json({ message: "Order placed successfully!", order }); // Return success message and the order
  } catch (error) {
    console.error("Error adding order:", error); // Log error details
    res
      .status(500)
      .json({ message: "Error adding order", error: error.message }); // Return error message
  }
});

// Get all orders for admin view (GET /api/orders)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find(); // Fetching all orders from the database
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

module.exports = router;
