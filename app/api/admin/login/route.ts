import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const password = body?.password;
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || password !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("nb_admin", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 6
  });
  return res;
}

