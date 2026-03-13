-- Adds per-channel tracking for WhatsApp and email welcome messages.
-- whatsapp_status: 'sent' | 'not_whatsapp' | 'api_error' | 'network_error' | 'error'
-- whatsapp_last_error: free-text last error message from provider, if any
-- email_status: reuse welcome_status semantics but scoped to email channel

ALTER TABLE waitlist_entries
  ADD COLUMN IF NOT EXISTS whatsapp_status text,
  ADD COLUMN IF NOT EXISTS whatsapp_last_error text,
  ADD COLUMN IF NOT EXISTS email_status text;

