import { neon } from "@neondatabase/serverless";
import type { WaitlistPayload } from "@/components/waitlist/validation";

const connectionString = process.env.NEON_DATABASE_URL;

if (!connectionString) {
  console.warn(
    "NEON_DATABASE_URL is not set. Waitlist submissions will fail until it is configured."
  );
}

const sql = connectionString ? neon(connectionString) : null;

export type WelcomeChannel = "whatsapp" | "email";
export type WelcomeStatus =
  | "sent"
  | "delivered"
  | "hard_bounce"
  | "soft_bounce"
  | "invalid_email"
  | "blocked"
  | "error"
  | "spam"
  | "unsubscribed";

export type WaitlistEntry = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  phone: string;
  is_whatsapp: boolean;
  town_description: string;
  town_country_code: string;
  dressing_frequency_per_month: string;
  avg_dressing_cost_bracket: string;
  status: string;
  dresses_too: string;
  who_dresses: string;
  locale: string;
  welcome_channel: WelcomeChannel | null;
  welcome_status: WelcomeStatus | null;
  brevo_message_id: string | null;
};

export async function insertWaitlistEntry(payload: WaitlistPayload) {
  if (!sql) {
    throw new Error("Database not configured");
  }

  const {
    firstName,
    lastName,
    gender,
    email,
    phone,
    isWhatsapp,
    townDescription,
    townPlaceId,
    townCountryCode,
    dressingFrequency,
    avgDressingCostBracket,
    status,
    dressesToo,
    whoDresses,
    locale
  } = payload;

  try {
    const rows = await sql`
      insert into waitlist_entries (
        first_name,
        last_name,
        gender,
        email,
        phone,
        is_whatsapp,
        town_description,
        town_place_id,
        town_country_code,
        dressing_frequency_per_month,
        avg_dressing_cost_bracket,
        status,
        dresses_too,
        who_dresses,
        locale
      )
      values (
        ${firstName},
        ${lastName},
        ${gender},
        ${email},
        ${phone},
        ${isWhatsapp ?? false},
        ${townDescription},
        ${townPlaceId},
        ${townCountryCode},
        ${dressingFrequency},
        ${avgDressingCostBracket},
        ${status},
        ${dressesToo},
        ${whoDresses},
        ${locale}
      )
      returning id, created_at
    `;

    return { inserted: true, id: rows[0].id as string };
  } catch (error: unknown) {
    // Unique violation on email or phone
    if (error != null && typeof error === "object" && "code" in error && (error as { code: string }).code === "23505") {
      return { inserted: false, duplicate: true as const };
    }
    throw error;
  }
}

export async function checkWaitlistExists(email?: string, phone?: string): Promise<{emailExists: boolean, phoneExists: boolean}> {
  if (!sql) return {emailExists: false, phoneExists: false};

  let emailExists = false;
  let phoneExists = false;

  if (email) {
    const rows = await sql`select 1 from waitlist_entries where email = ${email} limit 1`;
    emailExists = rows.length > 0;
  }

  if (phone) {
    const rows = await sql`select 1 from waitlist_entries where phone = ${phone} limit 1`;
    phoneExists = rows.length > 0;
  }

  return {emailExists, phoneExists};
}

export async function listWaitlistEntries(limit = 200): Promise<WaitlistEntry[]> {
  if (!sql) {
    throw new Error("Database not configured");
  }

  const rows = await sql`
    select
      id,
      created_at,
      first_name,
      last_name,
      gender,
      email,
      phone,
      is_whatsapp,
      town_description,
      town_country_code,
      dressing_frequency_per_month,
      avg_dressing_cost_bracket,
      status,
      dresses_too,
      who_dresses,
      locale,
      welcome_channel,
      welcome_status,
      brevo_message_id
    from waitlist_entries
    order by created_at desc
    limit ${limit}
  `;

  return rows as WaitlistEntry[];
}

export async function updateWelcomeTracking(
  entryId: string,
  channel: WelcomeChannel,
  status: WelcomeStatus,
  brevoMessageId?: string
) {
  if (!sql) throw new Error("Database not configured");

  await sql`
    update waitlist_entries
    set welcome_channel = ${channel},
        welcome_status = ${status},
        brevo_message_id = ${brevoMessageId ?? null}
    where id = ${entryId}
  `;
}

export async function updateWelcomeStatusByBrevoMessageId(
  messageId: string,
  status: WelcomeStatus
) {
  if (!sql) throw new Error("Database not configured");

  await sql`
    update waitlist_entries
    set welcome_status = ${status}
    where brevo_message_id = ${messageId}
  `;
}

