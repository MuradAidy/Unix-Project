const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

const {
  DB_HOST = "db",
  DB_USER = "root",
  DB_PASS = "root",
  DB_NAME = "resturant",
} = process.env;

async function getConn() {
  return mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
  });
}

app.get("/api/recommend", async (req, res) => {
  const meal = (req.query.meal || "").trim().toLowerCase();
  if (!meal) return res.status(400).json({ error: "meal is required" });

  const conn = await getConn();
  const [rows] = await conn.execute(
    "SELECT * FROM restaurants WHERE LOWER(meal)=? ORDER BY rating DESC LIMIT 1",
    [meal]
  );
  await conn.end();

  if (!rows.length) return res.json({ found: false, message: "No match" });
  res.json({ found: true, restaurant: rows[0] });
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Backend running on", PORT));
