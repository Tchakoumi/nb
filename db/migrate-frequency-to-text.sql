-- Run this if you have an existing waitlist_entries table with dressing_frequency_per_month as int.
-- This migrates the column to text to support the new frequency values (EVERY_4_WEEKS, EVERY_3_WEEKS, EVERY_2_WEEKS).

ALTER TABLE waitlist_entries
  ALTER COLUMN dressing_frequency_per_month TYPE text
  USING CASE dressing_frequency_per_month
    WHEN 1 THEN 'EVERY_4_WEEKS'
    WHEN 2 THEN 'EVERY_2_WEEKS'
    WHEN 3 THEN 'EVERY_3_WEEKS'
    WHEN 4 THEN 'EVERY_2_WEEKS'
    ELSE 'EVERY_4_WEEKS'
  END;
