const express = require("express");
const router = express.Router();

const { getCountries, getActivitiesByCountryId } = require("../controllers/countriesController");

router.get("/", getCountries);

router.get("/:idPais", getActivitiesByCountryId);

module.exports = router;
