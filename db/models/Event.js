const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    organizer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20],
      },
      unique: true,
      //unique need to be checked
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notContains: "event",
      },
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    numOfSeats: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
    bookedSeats: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: 1,
        isGreater(value) {
          if (value > this.numOfSeats) {
            throw new Error(
              "Booked Steats must be less than the Number of Seats."
            );
          }
        },
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isAfter: "2021-02-09",
        checkDate(value) {
          if (this.endDate && !value) {
            throw new Error("You need to select a start date");
          }
        },
      },
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        checkDate(value) {
          if (value < this.startDate) {
            throw new Error("End date can not be selected before start date");
          }
        },
      },
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  });

  SequelizeSlugify.slugifyModel(Event, {
    source: ["name"],
  });

  return Event;
};
