const express = require("express");

const app = express();

const port = process.env.PORT || 3300;

app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Hello World" }));

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

const Banks = sequelize.define(
  "banks",
  {
    name: {
      type: Sequelize.STRING(49),

      allowNull: true,
    },

    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "banks",
    schema: "public",
    timestamps: false,
    indexes: [
      {
        name: "banks_id_pkey",
        unique: true,
        fields: [{ name: "id" }],
      },
    ],
  }
);

app.get("/banks", async (req, res) => {
  try {
    const banks = await Banks.findAll({});

    res.json({ banks });
  } catch (error) {
    console.error(error);
  }
});

app.get("/banks/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const banks = await Banks.findAll({
      where: {
        id: id,
      },
    });

    res.json({ banks });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
