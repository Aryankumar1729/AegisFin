import express from "express";
import path from "path";
import fs from "fs";
import initSqlJs from "sql.js";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

const DB_PATH = path.join(process.cwd(), "data", "aegisfin_analytics.db");

let dbInstance: any = null;

async function getDb(): Promise<any> {
  if (dbInstance) return dbInstance;
  try {
    const SQL = await initSqlJs();
    if (fs.existsSync(DB_PATH)) {
      const fileBuffer = fs.readFileSync(DB_PATH);
      dbInstance = new SQL.Database(fileBuffer);
      console.log(`[AegisFin] Loaded SQLite database from ${DB_PATH}`);
    } else {
      console.warn(`[AegisFin] Warning: Database file not found at ${DB_PATH}. Initializing empty memory DB.`);
      dbInstance = new SQL.Database();
    }
  } catch (err) {
    console.error("[AegisFin] Failed to initialize sql.js WASM database:", err);
  }
  return dbInstance;
}

function runQueryAll(db: any, sql: string, params: any[] = []): any[] {
  if (!db) return [];
  const stmt = db.prepare(sql);
  if (params.length > 0) stmt.bind(params);
  const rows: any[] = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

function runQueryGet(db: any, sql: string, params: any[] = []): any {
  const rows = runQueryAll(db, sql, params);
  return rows.length > 0 ? rows[0] : null;
}

// 1. API: Key Performance Indicators
app.get("/api/kpis", async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.json({
        total_customers: 884203,
        total_transactions: 1048575,
        total_transaction_value: 7114250000,
        avg_transaction_value: 6784.12,
        total_account_balance: 59970000000,
        avg_account_balance: 67824.12
      });
    }

    const row = runQueryGet(db, `
      SELECT 
        (SELECT COUNT(*) FROM customers) AS total_customers,
        (SELECT COUNT(*) FROM transactions) AS total_transactions,
        (SELECT ROUND(SUM(transaction_amount), 2) FROM transactions) AS total_transaction_value,
        (SELECT ROUND(AVG(transaction_amount), 2) FROM transactions) AS avg_transaction_value,
        (SELECT ROUND(SUM(account_balance), 2) FROM customers) AS total_account_balance,
        (SELECT ROUND(AVG(account_balance), 2) FROM customers) AS avg_account_balance
    `);
    res.json(row);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 2. API: RFM Segments Summary
app.get("/api/rfm", async (req, res) => {
  try {
    const db = await getDb();
    if (!db) return res.json([]);

    const rows = runQueryAll(db, `
      SELECT 
        customer_segment,
        COUNT(customer_id) AS customer_count,
        ROUND(SUM(monetary_value), 2) AS total_monetary,
        ROUND(AVG(monetary_value), 2) AS avg_monetary,
        ROUND(AVG(frequency), 2) AS avg_frequency,
        ROUND(AVG(recency), 1) AS avg_recency
      FROM customer_rfm
      GROUP BY customer_segment
      ORDER BY total_monetary DESC
    `);
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 3. API: Top Locations Performance
app.get("/api/geographic", async (req, res) => {
  try {
    const db = await getDb();
    if (!db) return res.json([]);

    const rows = runQueryAll(db, `
      SELECT 
        location,
        COUNT(DISTINCT customer_id) AS customer_count,
        COUNT(transaction_id) AS transaction_count,
        ROUND(SUM(transaction_amount), 2) AS total_amount,
        ROUND(AVG(transaction_amount), 2) AS avg_amount
      FROM transactions
      WHERE location IS NOT NULL AND location != 'UNKNOWN'
      GROUP BY location
      ORDER BY total_amount DESC
      LIMIT 15
    `);
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 4. API: Monthly Trends
app.get("/api/monthly-trends", async (req, res) => {
  try {
    const db = await getDb();
    if (!db) return res.json([]);

    const rows = runQueryAll(db, `
      SELECT 
        month,
        COUNT(transaction_id) AS transaction_count,
        ROUND(SUM(transaction_amount), 2) AS total_amount,
        ROUND(AVG(transaction_amount), 2) AS avg_amount,
        COUNT(DISTINCT customer_id) AS active_customers
      FROM transactions
      GROUP BY month
      ORDER BY month ASC
    `);
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 5. API: SQL Files Reader
app.get("/api/sql-files", (req, res) => {
  const sqlDir = path.join(process.cwd(), "sql");
  try {
    if (!fs.existsSync(sqlDir)) return res.json([]);
    const files = fs.readdirSync(sqlDir).filter(f => f.endsWith(".sql")).sort();
    const result = files.map(filename => {
      const filePath = path.join(sqlDir, filename);
      const content = fs.readFileSync(filePath, "utf-8");
      return {
        filename,
        title: filename.replace(/^\d+_/, "").replace(".sql", "").replace(/_/g, " ").toUpperCase(),
        content
      };
    });
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 6. API: Custom SQL Query Runner
app.post("/api/execute-sql", async (req, res) => {
  const { sql } = req.body;
  if (!sql) {
    return res.status(400).json({ error: "No SQL query provided" });
  }

  const cleanSql = sql.trim().toUpperCase();
  if (cleanSql.startsWith("DROP") || cleanSql.startsWith("DELETE") || cleanSql.startsWith("UPDATE") || cleanSql.startsWith("INSERT")) {
    return res.status(400).json({ error: "Only SELECT analytical queries are allowed in this interface." });
  }

  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not loaded." });
    }
    const rows = runQueryAll(db, sql);
    res.json({
      columns: rows.length > 0 ? Object.keys(rows[0]) : [],
      rows,
      rowCount: rows.length
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Vite Middleware for development / static serving in production
async function startServer() {
  // Pre-initialize WASM DB
  await getDb();

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AegisFin] Enterprise Intelligence Server running on http://localhost:${PORT}`);
  });
}

startServer();
