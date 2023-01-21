const express = require('express')
const cors = require('cors');
const dotenv = require("dotenv").config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({extended: false}))

app.use("/api/v1/tour-planner", require("./routes/tour"))

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
})