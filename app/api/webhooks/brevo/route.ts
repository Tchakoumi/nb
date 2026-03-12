import { NextResponse } from "next/server";
import {
  updateWelcomeStatusByBrevoMessageId,
  type WelcomeStatus,
} from "@/lib/db";

const BREVO_EVENT_TO_STATUS: Record<string, WelcomeStatus> = {
  delivered: "delivered",
  hard_bounce: "hard_bounce",
  soft_bounce: "soft_bounce",
  invalid_email: "invalid_email",
  blocked: "blocked",
  error: "error",
  complaint: "spam",
  unsubscribed: "unsubscribed",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const messageId: string | undefined = body["message-id"];
    const event: string | undefined = body.event;

    if (!messageId || !event) {
      return NextResponse.json({ ok: false, reason: "missing fields" }, { status: 400 });
    }

    const status = BREVO_EVENT_TO_STATUS[event];
    if (!status) {
      console.log(`[brevo-webhook] Ignoring event "${event}" for message ${messageId}`);
      return NextResponse.json({ ok: true, ignored: true });
    }

    await updateWelcomeStatusByBrevoMessageId(messageId, status);
    console.log(`[brevo-webhook] Updated status to "${status}" for message ${messageId}`);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[brevo-webhook] Error processing webhook:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
