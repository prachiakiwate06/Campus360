/**
 * =================================================================
 * Campus 360 — Environment Variables Configuration
 * =================================================================
 * 
 * In a plain HTML/CSS/JavaScript project running in the browser,
 * environment variables are configured through this file on `window.__ENV`.
 * 
 * TO CONNECT YOUR SUPABASE PROJECT:
 * 1. Log into your Supabase Dashboard: https://supabase.com/dashboard
 * 2. Select your project -> Go to: Project Settings -> API
 * 3. Copy your "Project URL" and paste into `SUPABASE_URL` below.
 * 4. Copy your "anon public" API key and paste into `SUPABASE_ANON_KEY` below.
 * 
 * IMPORTANT SECURITY NOTE:
 * Only use the `anon` (public) key. Never put your `service_role` key here!
 */

window.__ENV = {
  SUPABASE_URL: "https://your-project.supabase.co",
  SUPABASE_ANON_KEY: "your-anon-publishable-key"
};
