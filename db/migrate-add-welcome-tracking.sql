-- Adds columns to track whether the welcome message (WhatsApp or email) was delivered.
-- welcome_channel: 'whatsapp' or 'email'
-- welcome_status:  delivery outcome (sent, delivered, hard_bounce, etc.)
-- brevo_message_id: Brevo messageId for correlating email webhook events

ALTER TABLE waitlist_entries
  ADD COLUMN IF NOT EXISTS welcome_channel text,
  ADD COLUMN IF NOT EXISTS welcome_status text,
  ADD COLUMN IF NOT EXISTS brevo_message_id text;
