const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const streetsOfCanadaRoutes = require("./routes/index");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", streetsOfCanadaRoutes);

//the next 2 lines will serve React (front end connected to back end)
app.use(express.static(path.join(__dirname, "..", "FrontEnd", "build")));
app.use(express.static("public"));

app.listen(port, () => console.log(`App listening on port ${port}`));
