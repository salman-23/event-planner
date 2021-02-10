const { Event } = require("../db/models");
const { Op } = require("sequelize");

//Event List

exports.eventList = async (req, res) => {
  try {
    if (req.body.date) {
      const _events = await Event.findAll({
        where: {
          satrtDate: {
            [Op.gt]: req.body.date,
          },
        },
        order: [
          ["startDate", "ASC"],
          ["name", "ASC"],
        ],
        attributes: ["id", "name", "image"],
      });

      res.status(200).json(_events);
    } else {
      const _events = await Event.findAll({
        order: [
          ["startDate", "ASC"],
          ["name", "ASC"],
        ],
        attributes: ["id", "name", "image"],
      });
      res.status(200).json(_events);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Event Detail
exports.eventDetail = async (req, res) => {
  const { eventId } = req.params;
  try {
    const foundEvent = await Event.findByPk(eventId, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (foundEvent) {
      res.json(foundEvent);
    } else {
      res.status(404).json({ message: "Sorry Event Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Event Create
exports.eventCreate = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const multipleEvents = await Event.bulkCreate(req.body);
      res.status(201).json(multipleEvents);
    } else {
      const newEvent = await Event.create(req.body);
      res.status(201).json(newEvent);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Event Update
exports.eventUpdate = async (req, res) => {
  const { eventId } = req.params;
  try {
    const foundEvent = await Event.findByPk(eventId);
    if (foundEvent) {
      await foundEvent.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Sorry Event Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Event Delete
exports.eventDelete = async (req, res) => {
  try {
    const eventId = req.params.eventId.split(",");
    const foundEvent = await Event.findAll({ where: { id: eventId } });
    if (foundEvent) {
      await Event.destroy({ where: { id: eventId } });
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Sorry Event Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fully Booked Events
exports.fullyBookedEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {
        bookedSeats: {
          [Op.col]: "Event.numOfSeats",
        },
      },
    });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
