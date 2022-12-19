const express = require("express");
const cors = require("cors");
const streetsOfCanadaRoutes = require("./routes/index");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/", streetsOfCanadaRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => console.log(`App listening on port ${port}`));
