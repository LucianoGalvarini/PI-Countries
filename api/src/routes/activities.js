const express = require("express");
const router = express.Router();
const { Country, Activity } = require("../db");

router.post("/", async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;
    let created = false;

    if (!name || !difficulty || !duration || !season || !countries) {
      return res.status(404).json({ msg: "incomplete form" });
    }

    for (let country of countries) {
      const activityExists = await Activity.findOne({
        where: { name: name },
        include: [
          {
            model: Country,
            where: {
              id: country.id,
            },
          },
        ],
      });

      if (!activityExists) {
        const newActivity = await Activity.create({ name, difficulty, duration, season });
        created = true;

        await newActivity.setCountries(countries.map((c) => c.id));
      }
    }

    return res.status(200).json({ created });
  } catch (error) {
    return res.status(404).json({ msg: error.msg });
  }
});

router.get("/", async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: {
        model: Country,
        attributes: ["id"],
        through: { attributes: [] },
      },
    });
    return res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({
      msg: "Ha ocurrido un error al obtener las actividades turísticas.",
    });
  }
});

module.exports = router;
