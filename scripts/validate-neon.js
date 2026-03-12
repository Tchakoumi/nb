#!/usr/bin/env node
/**
 * Validates that NEON_DATABASE_URL is set and can connect to Neon.
 * Run: node --env-file=.env.local scripts/validate-neon.js
 * Or:  npx dotenv -e .env.local -- node scripts/validate-neon.js
 */

const { neon } = require("@neondatabase/serverless");

async function main() {
  const url = process.env.NEON_DATABASE_URL;

  if (!url) {
    console.error("❌ NEON_DATABASE_URL is not set.");
    console.error("   Set it in .env.local or run with: node --env-file=.env.local scripts/validate-neon.js");
    process.exit(1);
  }

  // Basic format check
  if (!url.startsWith("postgresql://") && !url.startsWith("postgres://")) {
    console.error("❌ NEON_DATABASE_URL should start with postgresql:// or postgres://");
    process.exit(1);
  }

  // Mask password in logs
  const masked = url.replace(/:([^:@]+)@/, ":****@");

  try {
    const sql = neon(url);
    const rows = await sql`SELECT 1 as ok`;
    if (rows?.[0]?.ok === 1) {
      console.log("✅ NEON_DATABASE_URL is valid and connected.");
      console.log("   Connection:", masked);

      // Optionally check if waitlist_entries exists
      const tableCheck = await sql`
        SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = 'waitlist_entries'
        ) as exists
      `;
      if (tableCheck?.[0]?.exists) {
        console.log("   Table waitlist_entries: exists");
      } else {
        console.log("   Table waitlist_entries: not found (run db/schema.sql)");
      }
    } else {
      console.error("❌ Unexpected response from database.");
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
    if (err.code) console.error("   Code:", err.code);
    process.exit(1);
  }
}

main();
