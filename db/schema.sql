create table if not exists waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  first_name text not null,
  last_name text not null,
  gender text not null,

  email text not null,
  phone text not null,
  is_whatsapp boolean not null default false,

  town_description text not null,
  town_place_id text not null,
  town_country_code text not null,

  dressing_frequency_per_month text not null,
  avg_dressing_cost_bracket text not null,
  status text not null,
  dresses_too text not null,
  who_dresses text not null,

  locale text not null,

  -- welcome message tracking
  welcome_channel text,           -- 'whatsapp' | 'email' | null (not sent yet)
  welcome_status text,            -- 'sent' | 'delivered' | 'hard_bounce' | 'soft_bounce' | 'invalid_email' | 'blocked' | 'error' | 'spam' | 'unsubscribed'
  brevo_message_id text,          -- Brevo messageId for email webhook correlation

  -- per-channel tracking
  whatsapp_status text,           -- 'sent' | 'not_whatsapp' | 'api_error' | 'network_error' | 'error'
  whatsapp_last_error text,       -- last error message from WhatsApp provider, if any
  email_status text               -- email-specific status, mirroring welcome_status semantics
);

create unique index if not exists waitlist_entries_email_key on waitlist_entries (email);
create unique index if not exists waitlist_entries_phone_key on waitlist_entries (phone);

