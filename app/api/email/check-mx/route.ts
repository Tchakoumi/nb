import { NextResponse } from "next/server";
import dns from "node:dns/promises";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, error: "valid email is required" },
        { status: 400 }
      );
    }

    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain) {
      return NextResponse.json({ ok: true, valid: false }, { status: 200 });
    }

    try {
      const records = await dns.resolveMx(domain);
      const valid = Array.isArray(records) && records.length > 0;
      return NextResponse.json({ ok: true, valid }, { status: 200 });
    } catch {
      return NextResponse.json({ ok: true, valid: false }, { status: 200 });
    }
  } catch (error) {
    console.error("email MX check error", error);
    return NextResponse.json(
      { ok: false, valid: false },
      { status: 500 }
    );
  }
}
