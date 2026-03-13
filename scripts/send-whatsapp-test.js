// Simple WhatsApp send test script.
// Usage:
//   node --env-file=.env.local scripts/send-whatsapp-test.js 33751321131 "Hello from Nomad Braid"

async function main() {
  const [, , rawPhone, rawText] = process.argv;

  const phoneInput = rawPhone || "33751321131";
  const text =
    rawText || "Hello from Nomad Braid (test message from dev script).";

  const apiKey = process.env.WHATSAPP_API_KEY;
  const baseUrl = process.env.WHATSAPP_BASE_URL;

  if (!apiKey || !baseUrl) {
    console.error(
      "[whatsapp-test] WHATSAPP_API_KEY or WHATSAPP_BASE_URL is missing in environment."
    );
    process.exit(1);
  }

  const url = `${baseUrl}/api/v1/message/sendText`;

  // Strip non-digits, similar to the check function.
  const number = phoneInput.replace(/\D/g, "");

  console.log("[whatsapp-test] Sending message...");
  console.log("[whatsapp-test] URL:", url);
  console.log("[whatsapp-test] Number:", number);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ number, text }),
    });

    const bodyText = await res.text();

    console.log("[whatsapp-test] HTTP status:", res.status, res.statusText);

    try {
      const json = JSON.parse(bodyText);
      console.log("[whatsapp-test] Response JSON:", JSON.stringify(json, null, 2));
    } catch {
      console.log("[whatsapp-test] Raw response body:", bodyText);
    }
  } catch (error) {
    console.error("[whatsapp-test] Error sending message:", error);
    process.exit(1);
  }
}

main();

