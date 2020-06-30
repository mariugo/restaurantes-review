const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const port = 3000;

//middleware
app.use(cors());
app.use(express.json());



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});