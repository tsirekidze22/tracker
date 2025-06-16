const express = require("express");
const cors = require("cors");
const statsRoutes = require("./routes/stats");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(
  cors({
    origin: "https://tracker-iy3d.onrender.com", // deployed
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use("/", statsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
