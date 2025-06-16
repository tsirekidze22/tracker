const express = require("express");
const router = express.Router();
const ip3country = require("ip3country");
const redis = require("../redis/client.js");

ip3country.init();

// Gets IP from request
function getClientIP(req) {
  const xf = req.headers["x-forwarded-for"];
  const ip = xf ? xf.split(",")[0] : req.socket.remoteAddress;

  if (ip === "::1" || ip === "127.0.0.1") return "LOCAL";

  return ip;
}

router.post("/track", async (req, res) => {
  try {
    const ip = getClientIP(req);
    let countryCode = ip3country.lookupStr(ip);

    console.log("Incoming IP:", ip);
    console.log("Detected Country Code:", countryCode);

    if (!countryCode || ip === "LOCAL") {
      countryCode = "local";
    }

    await redis.incr(countryCode.toLowerCase());

    res.json({ message: `Visit tracked for ${countryCode}` });
  } catch (error) {
    console.error("Tracking error:", error);
    res.status(500).json({ error: "Failed to track visit" });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const keys = await redis.keys("*");

    const result = {};
    for (const key of keys) {
      const val = await redis.get(key);
      result[key] = parseInt(val);
    }

    res.json(result);
  } catch (error) {
    console.error("Stats retrieval error:", error);
    res.status(500).json({ error: "Failed to retrieve stats" });
  }
});

module.exports = router;
