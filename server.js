const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const busRoutes = require("./routes/busRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://busticketbooking-peach.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

/* ---------- DATABASE ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected Successfully"))
  .catch((err) => console.log(err));

/* ---------- ROUTES ---------- */
app.get("/", (req, res) => {
  res.send("Bus Booking Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

/* ---------- EXPORT FOR VERCEL ---------- */
module.exports = app;
