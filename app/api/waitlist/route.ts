import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { waitlistSchema } from "@/components/waitlist/validation";
import { insertWaitlistEntry, updateWelcomeTracking } from "@/lib/db";
import { sendWelcomeWhatsApp } from "@/lib/whatsapp";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: Request) {
  const hdrs = await headers();

  try {
    const body = await request.json();

    // Normalize legacy key (old form sent dressingFrequencyPerMonth as 1-4)
    if (body.dressingFrequencyPerMonth !== undefined && body.dressingFrequency === undefined) {
      const map: Record<number, string> = {
        1: "EVERY_4_WEEKS",
        2: "EVERY_2_WEEKS",
        3: "EVERY_3_WEEKS",
        4: "EVERY_2_WEEKS"
      };
      body.dressingFrequency = map[body.dressingFrequencyPerMonth] ?? "EVERY_4_WEEKS";
    }

    const locale =
      typeof body.locale === "string" && (body.locale === "en" || body.locale === "fr")
        ? (body.locale as "en" | "fr")
        : (hdrs.get("accept-language")?.toLowerCase().includes("fr") ? "fr" : "en");

    const parsed = waitlistSchema.parse({
      ...body,
      locale,
      userAgent: hdrs.get("user-agent") ?? undefined
    });

    if (!parsed.dressingFrequency) {
      return NextResponse.json(
        { ok: false, status: "validation_error", fieldErrors: { dressingFrequency: "required" } },
        { status: 400 }
      );
    }

    const result = await insertWaitlistEntry(parsed);

    if ("inserted" in result && result.inserted) {
      console.log("[waitlist] Inserted entry:", result.id, "email:", parsed.email);

      const whatsapp = await sendWelcomeWhatsApp(parsed.phone, parsed.firstName, locale);

      let emailResult = null;
      if (whatsapp.sent) {
        await updateWelcomeTracking(result.id, "whatsapp", "sent");
      } else {
        emailResult = await sendWelcomeEmail(parsed.email, parsed.firstName, locale);
        if (emailResult.sent) {
          await updateWelcomeTracking(result.id, "email", "sent", emailResult.messageId);
        }
      }

      return NextResponse.json(
        {
          ok: true,
          status: "created",
          whatsapp,
          email: emailResult,
        },
        { status: 201 }
      );
    }

    if ("duplicate" in result && result.duplicate) {
      return NextResponse.json(
        {
          ok: true,
          status: "duplicate"
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        status: "created"
      },
      { status: 201 }
    );
  } catch (error) {
    if ((error as { name?: string }).name === "ZodError") {
      const fieldErrors: Record<string, string> = {};
      for (const issue of error.issues) {
        const key = issue.path[0];
        if (typeof key === "string") {
          fieldErrors[key] = issue.message === "invalid-phone" ? "phone" : "invalid";
        }
      }

      return NextResponse.json(
        { ok: false, status: "validation_error", fieldErrors },
        { status: 400 }
      );
    }

    console.error("waitlist POST error", error);
    return NextResponse.json(
      { ok: false, status: "error" },
      { status: 500 }
    );
  }
}

