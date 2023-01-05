const express = require("express");

const app = express();

const port = process.env.PORT || 3300;

app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Hello World" }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
