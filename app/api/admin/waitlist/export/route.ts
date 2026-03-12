import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { listWaitlistEntries, type WaitlistEntry } from "@/lib/db";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("nb_admin")?.value;
  if (token !== "1") {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const entries = await listWaitlistEntries(1000);

  const header =
    "id,created_at,first_name,last_name,gender,email,phone,town_description,town_country_code,dressing_frequency_per_month,avg_dressing_cost_bracket,status,dresses_too,who_dresses,locale,welcome_channel,welcome_status\n";

  const rows = entries
    .map((e: WaitlistEntry) =>
      [
        e.id,
        e.created_at,
        e.first_name,
        e.last_name,
        e.gender,
        e.email,
        e.phone,
        e.town_description,
        e.town_country_code,
        e.dressing_frequency_per_month,
        e.avg_dressing_cost_bracket,
        e.status,
        e.dresses_too,
        e.who_dresses,
        e.locale,
        e.welcome_channel,
        e.welcome_status
      ]
        .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const csv = header + rows;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="waitlist.csv"'
    }
  });
}

