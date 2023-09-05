const express = require("express");
const cors = require("cors");
const db = require("./data/db.js");
const app = express();

app.use(cors({
    origin : "*"
}));

app.use(express.json());
app.get("/words" ,(req, res) => {
    res.json(db);
})
const port = process.env.PORT || 8080;
app.listen(port ,() => {
    console.log(`server is listening at ${port}`)
})

