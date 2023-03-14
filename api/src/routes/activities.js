const express = require("express");
const router = express.Router();
const { Country, Activity } = require("../db");

router.post("/", async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;

    if (!countries || !countries.length) {
      return res
        .status(400)
        .json({ msg: "Por favor incluya al menos un país." });
    }

    if (!name || !difficulty || !duration || !season) {
      return res
        .status(400)
        .json({ msg: "Por favor complete todos los campos requeridos." });
    }

    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    for (let country of countries) {
      const selectedCountry = await Country.findOne({
        where: { id: country },
      });
      await newActivity.addCountry(selectedCountry);
    }

    return res.status(200).json(newActivity);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Ha ocurrido un error al crear la actividad turística.",
    });
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
