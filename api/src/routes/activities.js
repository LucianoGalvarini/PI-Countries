const express = require("express");
const router = express.Router();
const { createActivity, getAllActivities } = require("../controllers/activitiesController.js");

router.post("/", createActivity);
router.get("/", getAllActivities);

module.exports = router;
