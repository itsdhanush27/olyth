-- Migration: Update waitlist_entries table schema for the new waitlist form structure

ALTER TABLE public.waitlist_entries 
  ADD COLUMN IF NOT EXISTS full_name TEXT,
  ADD COLUMN IF NOT EXISTS phone_number TEXT,
  ADD COLUMN IF NOT EXISTS company_address TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS estimated_users TEXT,
  ADD COLUMN IF NOT EXISTS package TEXT,
  ADD COLUMN IF NOT EXISTS thal_addon BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS how_learned TEXT,
  ADD COLUMN IF NOT EXISTS subject TEXT,
  ADD COLUMN IF NOT EXISTS message TEXT;
