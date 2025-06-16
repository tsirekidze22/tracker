const express = require("express");
const cors = require("cors");
const statsRoutes = require("./routes/stats");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000", // local
      "https://your-frontend.vercel.app", // deployed
    ],
  })
);

app.use("/", statsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
