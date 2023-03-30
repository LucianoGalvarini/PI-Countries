const express = require("express");
const router = express.Router();

const { getCountries, getCountryId } = require("../controllers/countriesController");

router.get("/", getCountries);

router.get("/:idPais", getCountryId);

module.exports = router;
