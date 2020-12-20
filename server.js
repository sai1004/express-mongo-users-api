const express = require("express");
const app = express();
const morgan = require("morgan");

require("dotenv").config();

const port = process.env.PORT;

const userRoutes = require("./routes/userRoutes");

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    message: "Users DB App",
  });
});

app.use("/api", userRoutes);

app.get("*", (req, res) => {
  res.json({
    message: "Invalid Route",
  });
});

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`
  ___________________________________
  server is listening on port ${port}
  -----------------------------------

  `);
});
