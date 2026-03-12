const requiredServerEnv = [
  "NEON_DATABASE_URL",
  "GOOGLE_MAPS_API_KEY",
  "ADMIN_PASSWORD",
  "WHATSAPP_API_KEY",
  "WHATSAPP_BASE_URL",
] as const;

const requiredClientEnv = [
  "NEXT_PUBLIC_INSTAGRAM_URL",
  "NEXT_PUBLIC_TIKTOK_URL",
  "NEXT_PUBLIC_WHATSAPP_URL",
] as const;

export function validateEnv() {
  const missing: string[] = [];

  for (const key of requiredServerEnv) {
    if (!process.env[key]) missing.push(key);
  }
  for (const key of requiredClientEnv) {
    if (!process.env[key]) missing.push(key);
  }

  if (missing.length > 0) {
    throw new Error(
      `\n\n❌ Missing required environment variables:\n\n` +
        missing.map((k) => `   - ${k}`).join("\n") +
        `\n\n   Add them to .env.local and restart.\n`
    );
  }
}
