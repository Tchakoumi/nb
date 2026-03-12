import { NextResponse } from "next/server";
import { checkHasWhatsapp } from "@/lib/whatsapp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone } = body;

    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { ok: false, error: "phone is required" },
        { status: 400 }
      );
    }

    const hasWhatsapp = await checkHasWhatsapp(phone);

    return NextResponse.json({ ok: true, hasWhatsapp }, { status: 200 });
  } catch (error) {
    console.error("whatsapp check error", error);
    return NextResponse.json(
      { ok: false, hasWhatsapp: false },
      { status: 500 }
    );
  }
}
