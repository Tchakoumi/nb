#!/usr/bin/env node
/**
 * Creates the waitlist_entries table in Neon.
 * Run: node --env-file=.env.local scripts/setup-neon.js
 */

const { neon } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");

async function main() {
  const url = process.env.NEON_DATABASE_URL;

  if (!url) {
    console.error("❌ NEON_DATABASE_URL is not set.");
    process.exit(1);
  }

  const schemaPath = path.join(__dirname, "..", "db", "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");

  // Split into statements (simple split - no semicolons in our schema strings)
  const statements = schema
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  try {
    const sql = neon(url);
    for (const stmt of statements) {
      const fullStmt = stmt + ";";
      await sql.query(fullStmt, []);
    }
    console.log("✅ Schema applied successfully.");
  } catch (err) {
    console.error("❌ Failed:", err.message);
    process.exit(1);
  }
}

main();
