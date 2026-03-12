import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { listWaitlistEntries } from "@/lib/db";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("nb_admin")?.value;
  if (token !== "1") {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const entries = await listWaitlistEntries(500);

  return NextResponse.json({ entries });
}

