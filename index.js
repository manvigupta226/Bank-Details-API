const express = require("express");

const app = express();

const port = process.env.PORT || 3300;

app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Hello World" }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "postgresql://postgres:F9CXfrtNCJWuGjAeRbaL@containers-us-west-16.railway.app:7851/railway"
);

// TO TEST THE CONNECTION

sequelize

  .authenticate()

  .then(() => {
    console.log("Connection has been established successfully.");
  })

  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
