#!/usr/bin/env node
/**
 * One-file project launcher.
 *
 * What it does:
 *   1. Reads backend/.env for DB credentials
 *   2. Creates the database + job_descriptions table if they don't already exist
 *      (using the mysql2 driver already installed in backend/node_modules -
 *       no dependency on the `mysql` CLI being on your PATH)
 *   3. Boots the backend (npm run dev) and frontend (npm run dev) together
 *   4. Ctrl+C stops both
 *
 * Usage:
 *   node start.js
 */

const { spawn } = require("child_process");
const { readFileSync, existsSync } = require("fs");
const path = require("path");

const __root = __dirname;
const BACKEND_DIR = path.join(__root, "backend");
const FRONTEND_DIR = path.join(__root, "Frontend");
const ENV_PATH = path.join(BACKEND_DIR, ".env");

// ---------- 1. Load backend/.env ----------
function loadEnv(filePath) {
  if (!existsSync(filePath)) {
    console.error(`Missing .env file at ${filePath}`);
    process.exit(1);
  }
  const env = {};
  for (const line of readFileSync(filePath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
  }
  return env;
}

console.log("Starting launcher...\n");

const env = loadEnv(ENV_PATH);
const DB_HOST = env.DB_HOST || "localhost";
const DB_USER = env.DB_USER || "root";
const DB_PASSWORD = env.DB_PASSWORD || "";
const DB_NAME = env.DB_NAME;

if (!DB_NAME) {
  console.error("DB_NAME is not set in backend/.env");
  process.exit(1);
}

if (!DB_PASSWORD || DB_PASSWORD.toUpperCase() === "PASSWORD") {
  console.error(
    `\n⚠️  backend/.env still has a placeholder DB_PASSWORD.\n` +
    `   Open backend/.env and set it to your real MySQL password, then re-run this script.\n`
  );
  process.exit(1);
}

// ---------- 2. Create database + table if missing (via mysql2 driver) ----------
async function setupDatabase() {
  let mysql;
  try {
    mysql = require(path.join(BACKEND_DIR, "node_modules", "mysql2", "promise"));
  } catch (err) {
    console.error("\n❌ Could not find the mysql2 package in backend/node_modules.");
    console.error("   Run `npm install` inside the backend folder first.");
    process.exit(1);
  }

  console.log(`Checking database "${DB_NAME}"...`);

  let connection;
  try {
    // Connect without selecting a database first, so we can create it if missing
    connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    await connection.query(`USE \`${DB_NAME}\``);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS job_descriptions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        job_title VARCHAR(255) NOT NULL,
        industry VARCHAR(255),
        experience_level ENUM('Entry', 'Mid', 'Senior'),
        skills JSON,
        culture TEXT,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log(`Database "${DB_NAME}" and table "job_descriptions" are ready.\n`);
  } catch (err) {
    console.error("\n❌ Failed to set up the database automatically.");
    console.error(`   ${err.message}`);
    console.error("\n   Common causes:");
    console.error("   - MySQL server isn't running");
    console.error("   - DB_USER / DB_PASSWORD in backend/.env is wrong");
    console.error("   - MySQL is running on a different host/port than 'localhost'");
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

// ---------- 3. Boot backend + frontend together ----------
const FRONTEND_URL = "http://localhost:5173";

function openBrowser(url) {
  if (process.platform === "win32") {
    // "start" is a shell builtin on Windows, needs shell:true and an empty title arg
    spawn("cmd", ["/c", "start", "", url], { shell: true, stdio: "ignore" });
  } else if (process.platform === "darwin") {
    spawn("open", [url], { stdio: "ignore" });
  } else {
    spawn("xdg-open", [url], { stdio: "ignore" });
  }
}

function run(name, cwd, color, onData) {
  if (!existsSync(cwd)) {
    console.error(`Directory not found: ${cwd}`);
    process.exit(1);
  }

  const child = spawn(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "dev"], {
    cwd,
    shell: true,
    stdio: "pipe",
  });

  child.stdout.on("data", (d) => {
    const text = d.toString();
    process.stdout.write(`\x1b[${color}m[${name}]\x1b[0m ${text}`);
    if (onData) onData(text);
  });
  child.stderr.on("data", (d) =>
    process.stderr.write(`\x1b[${color}m[${name}]\x1b[0m ${d}`)
  );
  child.on("error", (err) => {
    console.error(`[${name}] failed to start:`, err.message);
  });
  child.on("exit", (code) => {
    console.log(`[${name}] exited with code ${code}`);
  });

  return child;
}

async function main() {
  await setupDatabase();

  console.log("Starting backend and frontend...\n");
  const backend = run("backend", BACKEND_DIR, "36");   // cyan

  let browserOpened = false;
  const frontend = run("frontend", FRONTEND_DIR, "35", (text) => {
    // Vite prints "Local:   http://localhost:5173/" once it's actually ready
    if (!browserOpened && /Local:\s+http/i.test(text)) {
      browserOpened = true;
      console.log(`\nOpening ${FRONTEND_URL} in your browser...\n`);
      openBrowser(FRONTEND_URL);
    }
  });

  // Fallback: if Vite's "Local:" line is missed for any reason, still try
  // opening the browser after a reasonable delay so the page isn't left closed.
  setTimeout(() => {
    if (!browserOpened) {
      browserOpened = true;
      console.log(`\nOpening ${FRONTEND_URL} in your browser...\n`);
      openBrowser(FRONTEND_URL);
    }
  }, 8000);

  process.on("SIGINT", () => {
    console.log("\nShutting down...");
    backend.kill();
    frontend.kill();
    process.exit(0);
  });
}

main();