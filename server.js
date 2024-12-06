const express = require("express");
const tutorialRoutes = require("./tutorialRoutes/routes");

const app = express();

const port = 5000;

app.use(express.json());

app.use("/api/tutorials", tutorialRoutes);

app.get("/", (req, res) => res.send("Server is running"));

app.listen(port, () => console.log(`server is running on the port ${port}`));
