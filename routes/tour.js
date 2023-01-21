const express = require("express")
const router = express.Router()
const { createTourPlan } = require("../controllers/tour")

router.post("/plan", createTourPlan)

module.exports = router