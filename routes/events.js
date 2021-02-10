const express = require("express");
const {
  eventCreate,
  eventDetail,
  eventUpdate,
  eventList,
  eventDelete,
  fullyBookedEvents,
} = require("../controllers/eventControllers");
const db = require("../db/models");

const router = express.Router();

//Event List Route
router.get("/", eventList);

// Event Detail Route
router.get("/:eventId", eventDetail);

//Event Create Route
router.post("/", eventCreate);

//Event Update Route
router.put("/:eventId", eventUpdate);

//Event Delete Route
router.delete("/:eventId", eventDelete);

//Event Fully Booked Route
router.get("/fullyBooked", fullyBookedEvents);

db.sequelize.authenticate();
db.sequelize.sync();
// db.sequelize.sync({ alter: true });

module.exports = router;
