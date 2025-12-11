-- Add resend_api_key column to email_settings table
ALTER TABLE public.email_settings 
ADD COLUMN IF NOT EXISTS resend_api_key text;