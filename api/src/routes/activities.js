const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

router.post("/", async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;

    if (!name || !difficulty || !duration || !season || !countries) {
      return res
        .status(400)
        .json({ msg: "Por favor complete todos los campos requeridos." });
    }

    // Crear actividad turística
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    // Agregar los países a la actividad turística
    for (let country of countries) {
      const selectedCountry = await Country.findOne({
        where: { id: country.id },
      });
      await newActivity.addCountry(selectedCountry);
    }

    return res.status(201).json({
      success: true,
      message: "La actividad turística ha sido creada con éxito.",
      data: newActivity,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Ha ocurrido un error al crear la actividad turística.",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: {
        model: Country,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    });
    return res.status(200).json({
      success: true,
      data: activities,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Ha ocurrido un error al obtener las actividades turísticas.",
    });
  }
});

module.exports = router;
