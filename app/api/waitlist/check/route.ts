import { NextResponse } from "next/server";
import { checkWaitlistExists } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, phone } = body;

    const { emailExists, phoneExists } = await checkWaitlistExists(email, phone);

    return NextResponse.json(
      {
        ok: true,
        emailExists,
        phoneExists
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("waitlist check error", error);
    return NextResponse.json(
      { ok: false, status: "error" },
      { status: 500 }
    );
  }
}
