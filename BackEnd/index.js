const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const streetsOfCanadaRoutes = require("./routes/index");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/", streetsOfCanadaRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => console.log(`App listening on port ${port}`));
